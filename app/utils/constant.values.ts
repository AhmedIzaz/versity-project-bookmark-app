export const unAuthenticatedRoutes = ['/login', '/reset_password', '/forgot_password', '/signup']

// these extra routes are also valid for all user but in authenticated condition
export const extraAuthenticatedRoutes = ['/change_password']

export const OAuthTypeDDL: TDDLOption[] = [
	{ value: 'GOOGLE', label: 'Google' },
	{ value: 'FACEBOOK', label: 'Facebook' },
	{ value: 'APPLE', label: 'Apple' },
]
