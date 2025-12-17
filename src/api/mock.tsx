export async function loginApi(payload: {
	email: string
	password: string
}): Promise<{ success: boolean; userId: string }> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const { email, password } = payload
			if (email === 'blocked@example.com')
				reject({ status: 403, message: 'User is blocked' })
			else if (email === 'server@example.com')
				reject({ status: 500, message: 'Server error' })
			else if (email === 'network@example.com')
				reject({ status: 0, message: 'Network error' })
			else if (password !== '111111')
				reject({ status: 401, message: 'Wrong password or email' })
			else resolve({ success: true, userId: 'user-1' })
		}, 1000)
	})
}

export async function verifyCodeApi(payload: {
	code: string
}): Promise<{ success: boolean }> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (payload.code !== '111111')
				reject({ status: 400, message: 'invalid code' })
			else resolve({ success: true })
		}, 1000)
	})
}
