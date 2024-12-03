export enum ActionEnum {
	GET = '',
	NONE = '',
	UPDATE = 'Update',
	CREATE = 'Create',
	DELETE = 'Delete',
	UPLOAD = 'Upload',
	VIEW = 'View',
	RESET = 'Reset',
	ASSIGN = 'Assign',
	APPROVE = 'Approve',
	REJECT = 'Reject',
	REVERT = 'Revert',
	DOWNLOAD = 'Download',
}

export enum OrderEnum {
	descend = 'desc',
	ascend = 'asc',
}

export enum OAuthTypeEnum {
	GOOGLE = 'Google',
	FACEBOOK = 'Facebook',
	LINKEDIN = 'Linkedin',
}

export enum ApprovalStatusEnum {
	APPROVED = 'Approved',
	PENDING = 'Pending',
	REJECTED = 'Rejected',
}
