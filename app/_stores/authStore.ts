import { StateCreator } from 'zustand'

const authStore: TAuthStoreFunc = (set) => ({
	user: undefined,
	isAuthenticated: false,
	authLoading: false,
	setAuthLoading: (isLoading) => set((_) => ({ authLoading: isLoading })),
	setAuthInformation: (info) => set((_) => ({ ...info }))
})

export default authStore

// types will be under page
type TAuthStoreField = {
	user?: TLoginResponse
	isAuthenticated: boolean
	authLoading: boolean
}
export type TAuthStore = TAuthStoreField & {
	setAuthLoading: (loading: boolean) => void
	setAuthInformation: (info: { user?: TLoginResponse; authLoading?: boolean; isAuthenticated: boolean }) => void
	
}
type TAuthStoreFunc = StateCreator<TAuthStore, [], [], TAuthStore>
