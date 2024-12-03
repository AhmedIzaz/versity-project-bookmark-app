import { useCallback, useEffect, useState } from 'react'
import { TablePaginationConfig } from 'antd'
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface'

const useTableChange = ({ defaultPagination, onTableChange }: TUseTableChangeProps) => {
	const [pagination, setPagination] = useState<TablePaginationConfig>(defaultPagination ?? initialPagination)
	const [sortInfo, setSortInfo] = useState<SorterResult<any>>(initialSortInfo)

	// useEffect(() => {
	// 	setSortInfo(initialSortInfo)
	// 	handleTableChange(initialPagination, undefined, initialSortInfo)
	// 	// eslint-disable-next-line
	// }, [])

	const handleTableChange = useCallback(
		(
			newPagination: TablePaginationConfig,
			_?: Record<string, FilterValue | null>,
			sorter?: SorterResult<any> | SorterResult<any>[],
			__?: TableCurrentDataSource<any>
		) => {
			setPagination(newPagination)
			setSortInfo(sorter as SorterResult<any>)
			onTableChange?.(newPagination, undefined, sorter as SorterResult<any>)
		},
		[onTableChange]
	)

	const resetPagination = useCallback(() => {
		setPagination(initialPagination)
	}, [])

	return {
		initialPagination,
		sortInfo,
		pagination,
		setPagination,
		resetPagination,
		handleTableChange,
	}
}

export default useTableChange

const initialSortInfo = {
	field: undefined,
	order: undefined,
}

const initialPagination = {
	current: 1,
	pageSize: 10,
	total: undefined,
}

type TUseTableChangeProps = {
	defaultPagination?: TablePaginationConfig
	onTableChange?: (
		pagination: TablePaginationConfig,
		_?: Record<string, FilterValue | null>,
		sorter?: SorterResult<any>
	) => void
}
