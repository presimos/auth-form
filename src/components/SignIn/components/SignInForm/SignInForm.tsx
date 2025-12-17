import { Button, Form } from 'antd'
import { useAuthForm } from '../../context'
import { type SignInFormValues } from '../../types'
import { FormSteps } from '../../utils'
import { LoginStep, VerifyCodeStep } from '..'
import { Logo } from '../../../Logo'
import styles from './SignInForm.module.css'
import { ArrowLeftOutlined } from '@ant-design/icons'

export const SignInForm = () => {
	const { step, handleLogin, handleVerifyCode, formRef, setStep } =
		useAuthForm()

	const onFinish = async () => {
		if (step === FormSteps.LOGIN) {
			await handleLogin()
		} else if (step === FormSteps.VERIFY_CODE) {
			await handleVerifyCode()
		}
	}

	return (
		<Form<SignInFormValues>
			ref={formRef}
			autoComplete="off"
			preserve
			onFinish={onFinish}
			className={styles.form}
		>
			<div className={styles.logo}>
				<Logo />
			</div>
			{step === FormSteps.LOGIN && <LoginStep />}
			{step === FormSteps.VERIFY_CODE && <VerifyCodeStep />}
			{step !== FormSteps.LOGIN && (
				<Button
					type="text"
					onClick={() => setStep(FormSteps.LOGIN)}
					className={styles.backButton}
					icon={<ArrowLeftOutlined />}
				/>
			)}
		</Form>
	)
}
