import LoginForm from '@/app/(auth)/_components/login.form'
import AuthContainer from '../_components/auth.container'

 const LoginPage = () => {
    return (
        <AuthContainer>        
            <LoginForm />
        </AuthContainer>
    )
}

export default LoginPage