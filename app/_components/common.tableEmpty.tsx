import React from 'react'

const CommonTableEmpty = ({ emptySubText, emptyText }: TEmptyTableProps) => {
	return (
		<div className='flex flex-col items-center justify-center text-center gap-9 py-40'>
			{emptySubText && (
				<p className='text-[#475569] text-xl max-w-[700px]'>
					{emptySubText.split('\n').map((line, index) => (
						<React.Fragment key={index}>
							{line}
							<br />
						</React.Fragment>
					))}
				</p>
			)}
			{emptyText && (
				<p className='text-[#048409] text-2xl font-medium'>
					{emptyText.split('\n').map((line, index) => (
						<React.Fragment key={index}>
							{line}
							<br />
						</React.Fragment>
					))}
				</p>
			)}
		</div>
	)
}

export default CommonTableEmpty
