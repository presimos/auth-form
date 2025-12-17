import { loginApi, verifyCodeApi } from '../../../api/mock'
import { handleSignInError, getFieldErrorFromStatus } from '../utils'
import type { LoginResponse, VerifyCodeResponse, FieldError } from '../types.ts'

export class SignInService {
	async login(email: string, password: string): Promise<LoginResponse> {
		try {
			return await loginApi({ email, password })
		} catch (error) {
			const signInError = handleSignInError(error)
			throw signInError
		}
	}

	async verifyCode(code: string): Promise<VerifyCodeResponse> {
		try {
			return await verifyCodeApi({ code })
		} catch (error) {
			const signInError = handleSignInError(error)
			throw signInError
		}
	}

	getFieldError(status?: number): FieldError | null {
		return getFieldErrorFromStatus(status)
	}
}

export const signInService = new SignInService()
