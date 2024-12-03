'use client'

// import components
import { ConfigProvider, Popover } from 'antd'
import UserPopoverList from './user.popover.list'
import useAuth from '../_hooks/useAuth'
import { useState, useEffect } from 'react'

export default function UserPopoverContainer({ children }: TChildren) {
	const [open, setOpen] = useState(false)
	const { logout, pathname } = useAuth()
	const closePopover = () => setOpen(false)
	useEffect(closePopover, [pathname])

	return (
		<ConfigProvider
			theme={{
				components: {
					Popover: {
						borderRadiusLG: 5,
					},
				},
			}}
		>
			<Popover
				content={<UserPopoverList logout={logout} onPopoverItemClick={closePopover} />}
				trigger={'click'}
				open={open}
				placement={'bottomRight'}
				onOpenChange={setOpen}
				overlayClassName={'border border-[#DADEE8] rounded-[5px]'}
				rootClassName={'min-w-[248px]'}
			>
				{children}
			</Popover>
		</ConfigProvider>
	)
}
