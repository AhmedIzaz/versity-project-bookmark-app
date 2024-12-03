import { useCallback, useState } from 'react'

const initialModalState: TModalState<any> = {
	actionType: undefined,
	isModalOpen: false,
	isModalLoading: false,
	modalTitle: '',
	modalChild: null,
	modalHeaderClass: '',
	modalTitleClass: '',
	modalWidth: undefined,
	modalData: undefined,
}

const useModal = <T>({ onModalClose, onModalOpen, isLoading = false }: TUseModalProps) => {
	const [modalState, setModalState] = useState<TModalState<T>>({
		...initialModalState,
		isModalLoading: isLoading,
	})

	const handleModal = useCallback(
		({ isModalOpen, ...rest }: TModalState<T>) => {
			if (isModalOpen) {
				setModalState((prevState) => ({
					...prevState,
					...rest,
					isModalOpen,
				}))
			} else {
				setModalState(initialModalState)
				onModalClose?.()
			}
		},
		[]
	)

	const hanldeModalChange = useCallback(<K extends keyof TModalState<T>>(key: K, value: TModalState<T>[K]) => {
		setModalState((prev) => ({ ...prev, [key]: value }))
	}, [])

	return {
		modalState,
		handleModal,
		hanldeModalChange,
		setModalLoading: (isLoading: boolean) => setModalState((prevState) => ({ ...prevState, isLoading })),
	}
}

export default useModal

type TUseModalProps = {
	onModalClose?: () => void
	onModalOpen?: () => void
	modalTitle?: string
	isLoading?: boolean
}

type TModalState<T> = {
	actionType?: TActionType
	isModalOpen?: boolean
	isModalLoading?: boolean
	modalTitle?: string
	modalChild?: React.ReactNode
	modalHeaderClass?: string
	modalTitleClass?: string
	modalWidth?: string | number
	modalData?: T
}
