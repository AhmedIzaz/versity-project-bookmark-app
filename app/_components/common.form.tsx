import { Form, FormProps } from 'antd'
import { memo, ReactElement } from 'react'

type TFormProps = FormProps & {
	children: ReactElement | (ReactElement | undefined)[]
}

const CommonForm = ({ layout, autoComplete, className, requiredMark, children, ...rest }: TFormProps) => {
	return (
		<Form
			scrollToFirstError={true}
			layout={layout || 'vertical'}
			autoComplete={autoComplete || 'off'}
			className={className}
			requiredMark={requiredMark || false}
			{...rest}
		>
			{children}
		</Form>
	)
}

export default memo(CommonForm)
