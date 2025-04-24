import {type ReactElement} from 'react';
import {useRouter} from 'next/router';
import {useMountEffect} from '@react-hookz/web';
import {CategorySection} from '@common/components/CategorySection';
import {Cutaway} from '@common/components/Cutaway';
import {PromoPoster} from '@common/components/PromoPoster';
import {useSearch} from '@common/contexts/useSearch';
import {LogoDiscord} from '@common/icons/LogoDiscord';
import {LogoTwitter} from '@common/icons/LogoTwitter';
import {YEARN_APPS} from '@common/utils/constants';

import CombinedVaultsTable from './components/CombinedVaultsTable';

export default function Home(): ReactElement {
	const router = useRouter();
	const {dispatch} = useSearch();

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

					<div className={'flex flex-col gap-10'}>
						<CategorySection
							title={'Yearn Apps'}
							onExpandClick={async () => router.push('/apps/yearn-apps')}
							apps={YEARN_APPS}
						/>
						<CombinedVaultsTable />
					</div>
				</div>
				<div className={'mt-16 flex w-full flex-col gap-6 md:flex-row'}>
					<Cutaway
						title={'Follow us on X'}
						icon={<LogoTwitter className={'text-white'} />}
						link={'https://yearn.finance/twitter'}
					/>
					<Cutaway
						title={'Join our Discord'}
						icon={<LogoDiscord className={'text-white'} />}
						link={'https://discord.com/invite/yearn'}
					/>
				</div>
			</div>
		</div>
	);
}
