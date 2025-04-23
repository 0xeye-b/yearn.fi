import type {ReactElement} from 'react';

const ChainColors: {[key: number]: string} = {
	1: '#627EEA',
	10: '#C80016',
	137: '#A726C1',
	250: '#1969FF',
	8453: '#1C55F5',
	42161: '#2F3749'
};

const ChainNames: {[key: number]: string} = {
	1: 'Ethereum',
	10: 'Optimism',
	137: 'Polygon PoS',
	250: 'Fantom',
	8453: 'Base',
	42161: 'Arbitrum'
};

function VaultChainTag({
	chainID,
	backgroundOpacity = 100
}: {
	chainID: number;
	backgroundOpacity?: number;
}): ReactElement {
	const textColor = 'text-white/' + backgroundOpacity;
	const bgColor = `bg-[${ChainColors[chainID]}]/` + backgroundOpacity;
	return (
		<div className={'w-fit'}>
			<div className={`rounded-2xl ${bgColor} ${textColor} px-3.5 py-1 text-xs`}>{ChainNames[chainID]}</div>
		</div>
	);
}

export {VaultChainTag};
