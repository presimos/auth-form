import type { ErrorResponse, FieldError } from '../types.ts'

export class SignInError extends Error {
	status?: number

	constructor(message: string, status?: number) {
		super(message)
		this.name = 'SignInError'
		this.status = status
	}
}

export function handleSignInError(error: unknown): SignInError {
	const errorObj = error as ErrorResponse
	const errorMessage =
		errorObj?.message || 'An error occurred. Please try again.'
	return new SignInError(errorMessage, errorObj?.status)
}

export function getFieldErrorFromStatus(status?: number): FieldError | null {
	if (status === 401) {
		return {
			field: 'password',
			message: 'Wrong password or email',
		}
	}
	return null
}
