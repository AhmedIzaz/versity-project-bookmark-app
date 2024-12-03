import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Form, Input, InputProps } from 'antd'
import { Rule } from 'antd/es/form'
import { FormItemLayout } from 'antd/es/form/Form'
import { TextAreaProps } from 'antd/es/input'
import { memo } from 'react'

type TCommonInputProps = InputProps &
	TextAreaProps & {
		rules?: Rule[]
		label?: string
		type?: InputProps['type'] | 'text-area'
		layout?: FormItemLayout
	}

const CommonInput = ({ layout, rules, label, required, name, type, ...rest }: TCommonInputProps) => {
	return (
		<Form.Item layout={layout} label={label} rules={rules} name={name} required={required}>
			{type === 'password' ? (
				// for password filed
				<Input.Password iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)} {...rest} />
			) : type === 'text-area' ? (
				// for text area field
				<Input.TextArea {...rest} />
			) : (
				// for all remaining fields
				<Input {...rest} />
			)}
		</Form.Item>
	)
}

export default memo(CommonInput)
