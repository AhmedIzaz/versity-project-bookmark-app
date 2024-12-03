import { Table, TableProps } from 'antd'
import CommonTableEmpty from './common.tableEmpty'
import { memo } from 'react'
type TCommonTableProps = TableProps & TEmptyTableProps
const CommonTable = ({ emptySubText, emptyText, dataSource, ...rest }: TCommonTableProps) => {
	return (
		<>
			<style>
				{`
				.ant-spin-nested-loading{
					height: 100%;
				}
				.ant-spin-container{
						height: 100%;
					    display: flex;
    					flex-direction: column;
				}
				.ant-table{
					flex: 1;
					overflow-y: auto;
				}
				${
					!dataSource?.length
						? `
						.ant-table-cell{
							border:none !important;
						}
					`
						: ''
				}		
			`}
			</style>

			<div className='flex-1 overflow-auto px-2'>
				<Table
					className={`h-full overflow-hidden ${rest.className ?? ''}`}
					locale={{ emptyText: <CommonTableEmpty emptySubText={emptySubText} emptyText={emptyText} /> }}
					dataSource={dataSource}
					{...rest}
				/>
			</div>
		</>
	)
}

export default memo(CommonTable)
