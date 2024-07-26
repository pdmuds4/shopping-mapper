import { useState } from 'react'
import { Stack, Link, Box } from '@mui/material'
import { CustomInput, CustomButton } from '@components/ui'


const LoginForm: React.FC = () => {
    const [loginInVal, setLoginInVal] = useState({email: '', password: ''})

    return (
        <Stack spacing={4}>
            <CustomInput 
                label="Eメールアドレス" 
                type='email'
                onChange={(e)=>setLoginInVal({...loginInVal, email: e.target.value})}
            />
            <CustomInput
                label="パスワード"
                type='password'
                onChange={(e)=>setLoginInVal({...loginInVal, password: e.target.value})}
            />
            <CustomButton
                // [TODO]: APIにログイン情報を送信する処理を追加
                onClick = {()=>console.log(loginInVal)}
                disabled={loginInVal.email === '' || loginInVal.password === ''}
            >ログイン</CustomButton>
            <Box textAlign='center'>
                <Link 
                    href='/register' 
                    underline="hover" 
                    sx={{color: 'white'}}
                >パスワードをお忘れの方はこちら</Link>
            </Box>
        </Stack>
    )
}

export default LoginForm