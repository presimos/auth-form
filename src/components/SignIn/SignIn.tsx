import { AuthFormProvider } from './context'
import { SignInForm } from './components/SignInForm'
export const SignIn = () => {
	return (
		<AuthFormProvider>
			<SignInForm />
		</AuthFormProvider>
	)
}
