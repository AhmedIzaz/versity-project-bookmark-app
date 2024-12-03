import classNames from 'classnames'
import { memo, useMemo } from 'react'

const Title = ({ text, size = 'LARGE', className }: TTitleProps) => {
	const _classNames = useMemo(
		() =>
			classNames(
				'mb-0 p-2',
				{
					'text-[36px] font-bold': size === 'LARGE',
					'text-[28px] font-semibold': size === 'MEDIUM',
					'text-[22px] font-semibold': size === 'SMALL',
				},
				className
			),
		[size, className]
	)
	return <p className={_classNames}>{text}</p>
}

export default memo(Title)

type TTitleProps = {
	text: string
	size?: TSize
	className?: string
}
