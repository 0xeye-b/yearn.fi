import {opacityToHex} from '@common/utils/opacity';

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
	chainID = 1,
	backgroundOpacity = 0
}: {
	chainID?: number;
	backgroundOpacity?: number;
}): ReactElement {
	const textColor = `#ffffff${opacityToHex(backgroundOpacity)}`;
	const bgColor = `${ChainColors[chainID]}${opacityToHex(backgroundOpacity)}`;
	return (
		<div
			className={`rounded-2xl px-2 py-0.5 text-xs`}
			style={{color: textColor, backgroundColor: bgColor}}>
			{ChainNames[chainID]}
		</div>
	);
}

export {VaultChainTag};
