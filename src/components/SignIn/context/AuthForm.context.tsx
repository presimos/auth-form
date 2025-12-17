import { createContext, useContext } from 'react'
import type { AuthFormContextType } from '../types.ts'

export const AuthFormContext = createContext<AuthFormContextType | undefined>(
	undefined,
)

export const useAuthForm = () => {
	const context = useContext(AuthFormContext)
	if (!context) {
		throw new Error('useAuthForm must be used within AuthFormProvider')
	}
	return context
}