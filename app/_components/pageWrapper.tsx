import classNames from 'classnames'
const PageWrapper = ({ className, children }: TPageWrapperProps) => {
	return <div className={classNames('h-full flex flex-col', className)}>{children}</div>
}

export default PageWrapper
type TPageWrapperProps = {
	className?: string
	children: React.ReactNode
}
