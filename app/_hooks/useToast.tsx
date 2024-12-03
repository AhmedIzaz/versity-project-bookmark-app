import { notification } from 'antd'
import { ArgsProps } from 'antd/es/notification/interface'
import { useCallback } from 'react'

export type TOpenToastMessage = (params: ArgsProps) => void

const useToast = () => {
	const [api, toastContext] = notification.useNotification()
	const openToastMessage = useCallback(
		({ type, placement, message, description, duration }: ArgsProps) => {
			// @ts-ignore
			api[type]({ message, description, placement: placement ?? 'bottomRight', duration: duration ?? 2 })
		},
		[api]
	)
	return { openToastMessage, toastContext }
}

export default useToast
