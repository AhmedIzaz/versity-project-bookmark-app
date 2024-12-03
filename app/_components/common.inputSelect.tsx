import { Form, InputProps, Select, SelectProps } from 'antd'
import { Rule } from 'antd/es/form'
import { FormItemLayout } from 'antd/es/form/Form'
import { useMemo } from 'react'

type TCommonInputSelectProps = InputProps &
	SelectProps & {
		rules?: Rule[]
		label?: string
		layout?: FormItemLayout
		onChange?: (value: TDDLOption) => void
		optionValidityValue?: any
	}

const CommonInputSelect = ({
	layout,
	rules,
	label,
	required,
	name,
	type,
	onChange,
	options = [],
	optionValidityValue,
	...rest
}: TCommonInputSelectProps) => {
	// Check if the selected value exists in the options
	const isOptionExist = useMemo(
		() => options?.some((option) => option.value === optionValidityValue),
		[options, optionValidityValue]
	)
	// If not, create a fallback option
	const fallbackOption = useMemo(
		() =>
			!isOptionExist && optionValidityValue
				? [{ value: optionValidityValue, label: 'Unknown Option (Please change or Active the option)' }]
				: [],
		[optionValidityValue, isOptionExist]
	)
	return (
		<Form.Item layout={layout} label={label} rules={rules} name={name} required={required}>
			<Select
				optionFilterProp='children'
				onChange={(_, valueOption) => {
					onChange?.((valueOption as TDDLOption) || null)
				}}
				filterOption={
					rest.filterOption ||
					(rest.showSearch
						? (input, option) => ((option?.label as string) ?? '')?.toLowerCase().includes(input.toLowerCase())
						: undefined)
				}
				options={[...fallbackOption, ...options]} // Include fallback option if necessary
				{...rest}
			/>
		</Form.Item>
	)
}

export default CommonInputSelect
