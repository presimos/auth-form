import { type FormInstance } from 'antd'
import { FormSteps } from './utils'

export interface SignInFormValues {
	email: string
	password: string
	code: string
}

export type FormStepType = (typeof FormSteps)[keyof typeof FormSteps]

export interface AuthFormContextType {
	step: FormStepType
	loading: boolean
	isValid: boolean
	formRef: React.RefObject<FormInstance<SignInFormValues> | null>
	setStep: (step: FormStepType) => void
	setLoading: (loading: boolean) => void
	handleLogin: () => Promise<void>
	handleVerifyCode: () => Promise<void>
}

export interface AuthFormProviderProps {
	children: React.ReactNode
}

export interface LoginResponse {
	success: boolean
	userId: string
}

export interface VerifyCodeResponse {
	success: boolean
}

export interface ErrorResponse {
	message?: string
	status?: number
}

export interface FieldError {
	field: 'email' | 'password' | 'code'
	message: string
}