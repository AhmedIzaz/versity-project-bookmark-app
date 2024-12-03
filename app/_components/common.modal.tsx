import { Modal, ModalProps } from 'antd'
import classNames from 'classnames'
import { memo, useMemo } from 'react'

type TStyledModalProps = ModalProps & {
	title?: string
	modalContentClass?: string
	modalHeaderClass?: string
	actionType?: TActionType
}
const CommonModal = ({
	actionType,
	title,
	width,
	children,
	modalHeaderClass,
	modalContentClass,
	...rest
}: TStyledModalProps) => {
	const shouldSmall = useMemo(() => (['DELETE', 'APPROVE', 'REJECT'] as TActionType[]).includes(actionType!), [actionType])
	const modalWidth = width ?? shouldSmall ? 300 : 652
	const modalClassNames = useMemo(
		() => ({
			header: `${modalHeaderClass}`,
			content: classNames('!rounded-2xl lg:!px-[24px]', modalContentClass),
		}),
		[modalContentClass, modalHeaderClass]
	)
	return (
		<Modal
			width={modalWidth}
			footer={false}
			title={<ModalTitle shouldSmall={shouldSmall} title={title} />}
			classNames={modalClassNames}
			{...rest}
		>
			{children}
		</Modal>
	)
}
export default memo(CommonModal)

const ModalTitle = ({ title, shouldSmall, className }: TModalTitleProps) => {
	return (
		<p
			className={classNames(
				'font-semibold !mb-0',
				{
					'text-[28px] text-[#393C46]': !shouldSmall,
					' text-lg font-semibold text-red-500 text-center': shouldSmall,
				},
				className
			)}
		>
			{title}
		</p>
	)
}

type TModalTitleProps = {
	title?: string
	shouldSmall?: boolean
	className?: string
}
