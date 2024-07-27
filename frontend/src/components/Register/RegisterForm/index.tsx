import { useState } from 'react'
import { Stack, Link, Box } from '@mui/material'
import { CustomInput, CustomButton } from '@components/ui'


const RegisterForm: React.FC = () => {
    const [registerInVal, setRegisterInVal] = useState({
        email: '',
        second_email: '',
        password: ''
    })

    return (
        <Stack spacing={4}>
            <Box textAlign='center'>
                <CustomInput 
                    label="Eメールアドレス" 
                    type='email'
                    basecolor='white'
                    onChange={(e)=>setRegisterInVal({...registerInVal, email: e.target.value})}
                />
            </Box>
            <Box textAlign='center'>
                <CustomInput 
                    label="Eメールアドレス(再確認)" 
                    type='email'
                    basecolor='white'
                    onChange={(e)=>setRegisterInVal({...registerInVal, second_email: e.target.value})}
                    error={registerInVal.email !== registerInVal.second_email}
                    helperText={registerInVal.email !== registerInVal.second_email ? 'メールアドレスが一致しません' : ''}
                />
            </Box>
            <Box textAlign='center'>
                <CustomInput
                    label="パスワードを設定"
                    type="text"
                    basecolor='white'
                    onChange={(e)=>setRegisterInVal({...registerInVal, password: e.target.value})}
                />
            </Box>
            <Box textAlign='center'>
                <CustomButton
                    // [TODO]: APIにアカウント登録情報を送信する処理を追加
                    onClick = {()=>console.log(registerInVal)}
                    disabled={registerInVal.email === '' || registerInVal.password === ''}
                >アカウント登録</CustomButton>
            </Box>
            <Box textAlign='center'>
                <Link 
                    href='/login' 
                    underline="hover" 
                    sx={{color: 'white'}}
                >既にアカウントをお持ちの方はこちら</Link>
            </Box>
        </Stack>
    )
}

export default RegisterForm