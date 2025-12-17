import { useState, useRef } from 'react'

import { type FormInstance, message } from 'antd'
import {
	type SignInFormValues,
	type FormStepType,
	type AuthFormProviderProps,
} from '../types.ts'

import { AuthFormContext } from './AuthForm.context'
import { FormSteps } from '../utils'
import { signInService } from '../services'

export const AuthFormProvider = ({ children }: AuthFormProviderProps) => {
	const [step, setStep] = useState<FormStepType>(FormSteps.LOGIN)
	const [loading, setLoading] = useState<boolean>(false)
	const [isValid, setIsValid] = useState<boolean>(false)
	const formRef = useRef<FormInstance<SignInFormValues>>(null)

	const validateFields = async (fieldNames: string[]): Promise<boolean> => {
		try {
			await formRef.current?.validateFields(fieldNames)
			return true
		} catch {
			return false
		}
	}

	const handleLogin = async () => {
		console.log('handleLogin')
		const isValid = await validateFields(['email', 'password'])
		if (!isValid) {
			return
		}

		setLoading(true)
		try {
			const email = formRef.current?.getFieldValue('email') || ''
			const password = formRef.current?.getFieldValue('password') || ''

			const response = await signInService.login(email, password)

			if (response.success) {
				setStep(FormSteps.VERIFY_CODE)
			}
		} catch (error) {
			const signInError = error as { message?: string; status?: number }
			const errorMessage =
				signInError?.message ||
				'An error occurred during login. Please try again.'
			message.error(errorMessage)

			const fieldError = signInService.getFieldError(signInError?.status)
			if (fieldError) {
				formRef.current?.setFields([
					{
						name: fieldError.field,
						errors: [fieldError.message],
					},
				])
			}
		} finally {
			setLoading(false)
		}
	}

	const handleVerifyCode = async () => {
		const isValid = await validateFields(['code'])
		if (!isValid) {
			return
		}

		setLoading(true)
		try {
			const code = formRef.current?.getFieldValue('code') || ''

			const response = await signInService.verifyCode(code)

			if (response.success) {
				message.success('Verification successful!')
				setIsValid(true)
			}
		} catch (error) {
			const signInError = error as { message?: string }
			const errorMessage =
				signInError?.message || 'Invalid verification code. Please try again.'
			message.error(errorMessage)

			formRef.current?.setFields([
				{
					name: 'code',
					errors: [errorMessage],
				},
			])
			setIsValid(false)
		} finally {
			setLoading(false)
		}
	}

	return (
		<AuthFormContext
			value={{
				step,
				loading,
				formRef,
				setStep,
				setLoading,
				handleLogin,
				handleVerifyCode,
				isValid,
			}}
		>
			{children}
		</AuthFormContext>
	)
}