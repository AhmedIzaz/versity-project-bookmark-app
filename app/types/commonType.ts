import { UploadFile } from 'antd'
import { AxiosResponse } from 'axios'
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { JSXElementConstructor, ReactElement } from 'react'

export type TToastContext = ReactElement<any, string | JSXElementConstructor<any>>
export type TUploadedFile = {
	file: File
	fileList: UploadFile[]
}

export type TPush = (href: string, options?: NavigateOptions) => void

