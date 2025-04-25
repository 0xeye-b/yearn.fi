import {type ReactElement} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {z} from 'zod';
import {motion} from 'framer-motion';
import {useFetch} from '@builtbymom/web3/hooks/useFetch';
import {useMountEffect} from '@react-hookz/web';
import {CategoryHeading} from '@common/components/CategoryHeading';
import {CategorySection} from '@common/components/CategorySection';
import {PromoPoster} from '@common/components/PromoPoster';
import {TvlStat} from '@common/components/TvlStat';
import {useSearch} from '@common/contexts/useSearch';
import {YEARN_APPS} from '@common/utils/constants';

import CombinedVaultsTable from './components/CombinedVaultsTable';

const FeatureCard = ({
	title,
	description,
	icon,
	link
}: {
	title: string;
	description: string;
	icon: ReactElement;
	link: string;
}): ReactElement => {
	return (
		<Link
			href={link}
			className={'flex flex-col rounded-lg bg-white/5 hover:bg-white/10'}>
			<div className={'h-full p-4'}>
				<div className={'flex items-center gap-2 '}>
					<div className={'size-6 rounded-full bg-[#F5AC37]'} />
					<p className={'text-[20px] font-medium'}>{title}</p>
				</div>
				<p className={'mt-2 text-sm text-white/50'}>{description}</p>
			</div>
			<div className={'text-red-400 flex items-center gap-2 border-t border-white/10 px-4 py-2'}>
				<div>{icon}</div>
				<p className={'text-sm text-white/75'}>{'Earn 23.21%'}</p>
			</div>
		</Link>
	);
};

export default function Home(): ReactElement {
	const {dispatch} = useSearch();

	const {data: tvl} = useFetch<number>({
		endpoint: `https://api.llama.fi/tvl/yearn`,
		schema: z.number()
	});

	useMountEffect(() => {
		dispatch({searchValue: ''});
	});

	return (
		<div className={'relative mb-4 mt-24 flex w-full justify-start md:mt-10'}>
			<div className={'w-full p-6 !pl-8 pb-24 pt-0 md:px-2'}>
				<div className={'flex flex-col gap-y-14'}>
					<div className={'md:hidden'}>
						<PromoPoster />
					</div>

					<div className={'flex flex-col gap-7'}>
						<div className={'relative'}>
							<Image
								src={'/banner.png'}
								alt={'Yearn Logo'}
								priority
								width={2000}
								height={2000}
								className={'right-0 top-0 size-full bg-center object-cover'}
							/>
							<div
								className={
									'absolute bottom-0 left-0 flex size-full flex-col items-center justify-center gap-2'
								}>
								<motion.div
									animate={{
										y: [0, 5, 0],
										transition: {
											duration: 3,
											ease: 'easeInOut',
											repeat: Infinity
										}
									}}
									className={'mt-[-14px]'}>
									<Image
										src={'/3d-logo.png'}
										alt={'Yearn Logo'}
										priority
										width={84}
										height={84}
									/>
								</motion.div>
								<TvlStat tvl={tvl ?? 0} />
							</div>
						</div>
						<div className={'flex flex-col gap-4 rounded-lg bg-white/5 p-4'}>
							<CategorySection
								title={'Assets'}
								description={'Wrapped and liquid staked assets'}
								apps={YEARN_APPS}
							/>
						</div>

						<div className={'flex flex-col gap-4 rounded-lg bg-white/5 p-4'}>
							<CategoryHeading
								title={'Vaults'}
								description={'Strategies to maximize yield in risk-adjusted ways'}
							/>

							<div className={'mb-4 grid grid-cols-3 gap-4'}>
								<FeatureCard
									title={'USD Vault'}
									description={'Deposit USDC/USDT'}
									icon={<div>{'↑'}</div>}
									link={'https://yearn.finance/vaults/usd-vault'}
								/>
								<FeatureCard
									title={'ETH Vault'}
									description={'Deposit ETH/stETH'}
									icon={<div>{'↑'}</div>}
									link={'https://yearn.finance/vaults/eth-vault'}
								/>
								<FeatureCard
									title={'veYFI'}
									description={'Lock YFI to participate in governance and earn boosted yield'}
									icon={<div>{'⚡'}</div>}
									link={'https://yearn.finance/vaults/veyfi'}
								/>
							</div>

							<CombinedVaultsTable />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
