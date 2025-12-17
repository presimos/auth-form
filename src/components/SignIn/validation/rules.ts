import type { Rule } from 'antd/es/form'
import { MIN_PASSWORD_LENGTH, CODE_LENGTH } from '../utils'

export const emailValidationRules: Rule[] = [
	{ required: true, message: 'Please input your email!' },
	{
		type: 'email' as const,
		message: 'Please enter a valid email address!',
	},
]

export const passwordValidationRules: Rule[] = [
	{ required: true, message: 'Please input your password!' },
	{
		min: MIN_PASSWORD_LENGTH,
		message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long!`,
	},
]

export const codeValidationRules: Rule[] = [
	{ required: true, message: 'Please enter the verification code!' },
	{
		len: CODE_LENGTH,
		message: `Verification code must be ${CODE_LENGTH} digits!`,
	},
]
