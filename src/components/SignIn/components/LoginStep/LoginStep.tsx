import { Form, Input, Button } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useAuthForm } from '../../context'
import { emailValidationRules, passwordValidationRules } from '../../validation'
import styles from './LoginStep.module.css'
import { Typography } from 'antd'

const { Title } = Typography
export function LoginStep() {
	const { loading, formRef } = useAuthForm()

	const email = Form.useWatch('email', formRef?.current || undefined)
	const password = Form.useWatch('password', formRef?.current || undefined)

	const isDisabled = !email || !password

	return (
		<div className={styles.loginStep}>
			<Title
				level={3}
				className={styles.title}
			>
				Sign in to your account to continue Form
			</Title>
			<Form.Item
				name="email"
				rules={emailValidationRules}
				validateTrigger="onBlur"
				preserve
				className={styles.formItem}
			>
				<Input
					placeholder="Email"
					size="large"
					prefix={<UserOutlined />}
					disabled={loading}
					className={styles.input}
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={passwordValidationRules}
				validateTrigger="onBlur"
				preserve
				className={styles.formItem}
			>
				<Input.Password
					placeholder="Password"
					size="large"
					prefix={<LockOutlined />}
					disabled={loading}
					className={styles.input}
				/>
			</Form.Item>
			<Button
				type="primary"
				htmlType="submit"
				size="large"
				loading={loading}
				block
				disabled={isDisabled}
				className={styles.submitButton}
			>
				Log in
			</Button>
		</div>
	)
}