import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Stack, Link, Box, Snackbar, Alert } from '@mui/material'
import { CustomInput, CustomButton, LoadingDrop } from '@components/ui'

import UserRegisterUseCase from '@usecase/userRegister'
import UserInfoRepository from '@domain/userInfo/repository'
import { RegisterRequestDTO, RegisterResponseDTO, RegisterErrorDTO } from '@domain/userInfo/dto'

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const [requestDTO, setRegisterInVal] = useState<RegisterRequestDTO>(new RegisterRequestDTO())
    const [second_email, setSecondEmail] = useState<string|null>(null)

    // エラー関係
    const [is_open_snack, setSnack] = useState(false)
    const [error_msg, setErrorMsg] = useState('')

    // ローディング関係
    const [is_loading, setLoading] = useState(false)

    const registerUserHandler = async() => {
        setLoading(true)
        const response = await new UserRegisterUseCase(new UserInfoRepository, requestDTO).execute()
        console.log(response)

        if (response instanceof RegisterErrorDTO) {
            setErrorMsg(response.getMessage)
            setSnack(true)
        } else if (response instanceof RegisterResponseDTO) {
            localStorage.setItem('user_id', response.getId.toString())
            navigate('/')
        }
        setLoading(false)
    }

    return (
        <Stack spacing={4}>
            <Box textAlign='center'>
                <CustomInput 
                    label="Eメールアドレス" 
                    type='email'
                    basecolor='white'
                    onChange={(e)=>setRegisterInVal(requestDTO.updateMailAddress(e.target.value))}
                />
            </Box>
            <Box textAlign='center'>
                <CustomInput 
                    label="Eメールアドレス(再確認)" 
                    type='email'
                    basecolor='white'
                    onChange={(e)=>setSecondEmail(e.target.value === '' ? null : e.target.value)}
                    error={!requestDTO.equalsMailAddress(second_email)}
                    helperText={!requestDTO.equalsMailAddress(second_email) ? 'メールアドレスが一致しません' : ''}
                />
            </Box>
            <Box textAlign='center'>
                <CustomInput
                    label="パスワードを設定"
                    type="text"
                    basecolor='white'
                    onChange={(e)=>setRegisterInVal(requestDTO.updatePassword(e.target.value))}
                />
            </Box>
            <Box textAlign='center'>
                <CustomButton
                    onClick={registerUserHandler}
                    disabled={!second_email || requestDTO.hasEmptyProp() || !requestDTO.equalsMailAddress(second_email)}
                >アカウント登録</CustomButton>
            </Box>
            <Box textAlign='center'>
                <Link 
                    href='/login' 
                    underline="hover" 
                    sx={{color: 'white'}}
                >既にアカウントをお持ちの方はこちら</Link>
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

export default RegisterForm