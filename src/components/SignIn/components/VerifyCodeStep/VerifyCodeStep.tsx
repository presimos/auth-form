import { Form, Input, Button } from 'antd'
import { useAuthForm } from '../../context'
import { codeValidationRules } from '../../validation'
import { CODE_LENGTH } from '../../utils'
import styles from './VerifyCodeStep.module.css'
import { Typography } from 'antd'

const { Title } = Typography
export function VerifyCodeStep() {
	const { loading, formRef, handleVerifyCode, isValid } = useAuthForm()

	const handleCodeChange = async (value: string) => {
		if (value.length === CODE_LENGTH) {
			try {
				await formRef.current?.validateFields(['code'])
				await handleVerifyCode()
			} catch {
				// Лень дебажить, просто пропускаем
			}
		}
	}

	return (
		<div className={styles.verifyCodeStep}>
			<div className={styles.header}>
				<Title
					level={3}
					className={styles.title}
				>
					Two-Factor Authentication
				</Title>
				<p className={styles.text}>
					Enter the 6-digit code from the Google
					<br /> Authenticator app
				</p>
			</div>
			<Form.Item
				name="code"
				rules={codeValidationRules}
				validateTrigger={[]}
			>
				<Input.OTP
					length={CODE_LENGTH}
					size="large"
					formatter={(value) => value.replace(/[^0-9]/g, '')}
					inputMode="numeric"
					disabled={loading}
					onChange={handleCodeChange}
				/>
			</Form.Item>
			{isValid && (
				<Button
					type="primary"
					size="large"
					loading={loading}
					block
				>
					Continue
				</Button>
			)}
		</div>
	)
}