'use client'
import { Button } from 'antd'
import { JSXElementConstructor, memo, ReactElement } from 'react'

const CustomConfirmation = ({
	confirmFn,
	cancelFn,
	confirmText,
	cancelText,
	isLoading,
	toastContext,
	text,
}: CustomConfirmationProps) => {
	return (
		<div className={'space-y-4'}>
			{text && <p className='text-[#64748B]'>{text}</p>}
			<div className='flex items-center justify-center gap-5'>
				<>
					{toastContext}
					<Button loading={isLoading} type='primary' onClick={confirmFn}>
						{confirmText ?? 'Yes'}
					</Button>
				</>
				<Button onClick={cancelFn} type='default'>
					{cancelText ?? 'No'}
				</Button>
			</div>
		</div>
	)
}

export default memo(CustomConfirmation)

type CustomConfirmationProps = {
	confirmFn: () => void
	confirmText?: string
	cancelFn?: () => void
	cancelText?: string
	isLoading?: boolean
	text?: string
	toastContext?: ReactElement<any, string | JSXElementConstructor<any>>
}
