import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { SpinProps } from 'antd/es/spin'
import classNames from 'classnames'

const Loading = ({ fullContainer, className, ...rest }: SpinProps & { fullContainer?: boolean }) => {
	return (
		<Spin
			className={classNames(
				{
					'w-full h-full !flex !flex-col !justify-center !items-center': fullContainer,
				},
				className
			)}
			indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
			{...rest}
		/>
	)
}

export default Loading
