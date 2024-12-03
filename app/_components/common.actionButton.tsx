import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import classNames from 'classnames'
import { FC, memo, useMemo } from 'react'
import { ActionEnum } from '../utils/common.enum'
// if you need to add any properties, then you can add them here
type TCommonActionButtonProps = AntdIconProps & {
	actionType: TActionType
	onClick?: () => void
	icon?: FC<AntdIconProps>
}
// the component which will return action button
const CommonActionButton: FC<TCommonActionButtonProps> = ({
	actionType,
	onClick,
	icon,
	className,
	title,
	...rest
}: TCommonActionButtonProps) => {
	const IconComponent = icon || iconMap[actionType] // if you customly give icon then ok, if not then depend on your action type action button will be choosen from object
	const combinedClassName = useMemo(
		() => classNames(`text-[16px] p-1.5 border  rounded-md ${actionWiseStyle[actionType] ?? ''}`, className),
		[className, actionType]
	)
	return (
		<IconComponent onClick={onClick} className={combinedClassName} title={title || ActionEnum[actionType!]} {...rest} />
	) // if you want any properties to add then just add to type and add it to this component
}

export default memo(CommonActionButton)

// depend on action type , give your own icon's classname if not provided here
const actionWiseStyle: Record<any, string> = {
	UPDATE: '!text-green-600 !border-green-600 bg-green-100',
	DELETE: '!text-red-600 !border-red-600 bg-red-100',
	VIEW: '!text-blue-600 !border-blue-600 bg-blue-100',
}

// add other's action button if you need
const iconMap: Record<any, FC<any>> = {
	UPDATE: EditOutlined,
	DELETE: DeleteOutlined,
	VIEW: EyeOutlined,
}
