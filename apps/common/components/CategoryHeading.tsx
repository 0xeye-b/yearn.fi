import type {FC} from 'react';

export const CategoryHeading: FC<{title: string; description?: string}> = ({title, description}) => {
	return (
		<div className={'flex gap-x-2 py-2'}>
			<div className={'text-md whitespace-nowrap font-medium text-white'}>{title}</div>
			{!!description && (
				<div className={'text-md whitespace-nowrap border-l border-white/25 pl-2 font-[300] text-white/50'}>
					{description}
				</div>
			)}
		</div>
	);
};
