import { useState } from 'react'
import { Stack, Link, Box, Snackbar, Alert } from '@mui/material'
import { CustomInput, CustomButton, LoadingDrop } from '@components/ui'

import UserLoginUseCase from '@usecase/userLogin'
import UserInfoRepository from '@domain/userInfo/repository'
import { LoginRequestDTO } from '@domain/userInfo/dto'

const LoginForm: React.FC = () => {
    const [requestDTO, setLoginInVal] = useState<LoginRequestDTO>(new LoginRequestDTO())
    
    // エラー関係
    const [is_open_snack, setSnack] = useState(false)
    const [error_msg, setErrorMsg] = useState('')

    // ローディング関係
    const [is_loading, setLoading] = useState(false)

    const loginUsecaseHandler = async () => {
        setLoading(true)
        try {
            const response = await new UserLoginUseCase(new UserInfoRepository, requestDTO).execute()
            console.log(response)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMsg(error.message === '' ? 'エラーが発生しました' : error.message)
                setSnack(true)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Stack spacing={4}>
            <Box textAlign='center'>
                <CustomInput 
                    label="Eメールアドレス" 
                    type='email'
                    basecolor='white'
                    onChange={(e)=>setLoginInVal(requestDTO.updateMailAddress(e.target.value))}
                />
            </Box>
            <Box textAlign='center'>
                <CustomInput
                    label="パスワード"
                    type='password'
                    basecolor='white'
                    onChange={(e)=>setLoginInVal(requestDTO.updatePassword(e.target.value))}
                />
            </Box>
            <Box textAlign='center'>
                <CustomButton
                    // [TODO]: APIにログイン情報を送信する処理を追加
                    onClick = {loginUsecaseHandler}
                    disabled={requestDTO.hasEmptyProp()}
                >ログイン</CustomButton>
            </Box>
            <Box textAlign='center'>
                <Link 
                    href='/register' 
                    underline="hover" 
                    sx={{color: 'white'}}
                >アカウントをお持ちでない方はこちら</Link>
            </Box>

            {/* エラーメッセージ用のトースター */}
            <>
                <Snackbar 
                    open={is_open_snack} 
                    autoHideDuration={5000} 
                    onClose={()=>setSnack(false)}
                >
                    <Alert
                        onClose={()=>setSnack(false)}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {error_msg}
                    </Alert>
                </Snackbar>
            
            </>
            {/* API呼び出し中の待機画面 */}
            <>
                <LoadingDrop isOpen={is_loading} />
            </>
        </Stack>
    )
}

export default LoginForm