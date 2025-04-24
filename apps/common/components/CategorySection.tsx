import {Fragment, type ReactElement, useRef, useState} from 'react';
import {useMountEffect} from '@react-hookz/web';
import {CarouselControls} from '@common/CarouselControls';
import {CarouselSlideArrows} from '@common/CarouselSlideArrows';
import {CategoryHeading} from '@common/components/CategoryHeading';

import {AppsCarousel} from './AppsCarousel';

import type {TApp} from '@common/types/category';

type TAppSectionProps = {
	title: string;
	description?: string;
	apps: TApp[];
};

export const CategorySection = ({title, description, apps}: TAppSectionProps): ReactElement => {
	const [shuffledApps, set_shuffledApps] = useState<TApp[]>([]);
	const [currentPage, set_currentPage] = useState(1);
	const carouselRef = useRef<HTMLDivElement | null>(null);
	const [isProgrammaticScroll, set_isProgrammaticScroll] = useState(false);

	/**********************************************************************************************
	 ** Handles scrolling back to the previous page in the carousel.
	 ** It updates the scroll position, current page, and sets a flag to indicate programmatic
	 ** scrolling. The flag is reset after a delay to allow for smooth scrolling.
	 *********************************************************************************************/
	const onScrollBack = (): void => {
		if (!carouselRef.current || currentPage === 1) return;
		set_isProgrammaticScroll(true);
		carouselRef.current.scrollLeft -= 880;
		set_currentPage(prev => prev - 1);

		setTimeout(() => {
			set_isProgrammaticScroll(false);
		}, 3000);
	};

	/**********************************************************************************************
	 ** Handles scrolling forward to the next page in the carousel.
	 ** It updates the scroll position, current page, and sets a flag to indicate programmatic
	 ** scrolling. The flag is reset after a delay to allow for smooth scrolling.
	 *********************************************************************************************/
	const onScrollForward = (): void => {
		if (!carouselRef.current || currentPage === Math.ceil(apps.length / 4)) return;
		set_isProgrammaticScroll(true);
		carouselRef.current.scrollLeft += 880;
		set_currentPage(prev => prev + 1);

		setTimeout(() => {
			set_isProgrammaticScroll(false);
		}, 3000);
	};

	/**********************************************************************************************
	 ** Handles clicking on the carousel dots to navigate to a specific page.
	 ** It updates the scroll position, current page, and sets a flag to indicate programmatic
	 ** scrolling. The flag is reset after a delay to allow for smooth scrolling.
	 *********************************************************************************************/
	const onDotsClick = (destination: number): void => {
		if (!carouselRef.current || destination === currentPage) return;
		set_isProgrammaticScroll(true);
		if (destination > currentPage) {
			carouselRef.current.scrollLeft += 1000 * (destination - currentPage);
			setTimeout(() => {
				set_isProgrammaticScroll(false);
			}, 3000);
		} else {
			carouselRef.current.scrollLeft -= 1000 * (currentPage - destination);
			setTimeout(() => {
				set_isProgrammaticScroll(false);
			}, 3000);
		}
		set_currentPage(destination);
	};

	/**********************************************************************************************
	 ** Handles the scroll event of the carousel.
	 ** It calculates the current page based on the scroll position and updates the state.
	 ** This function is not triggered during programmatic scrolling to avoid conflicts.
	 *********************************************************************************************/
	const onScroll = (): void => {
		if (!carouselRef.current || isProgrammaticScroll) return;
		const {scrollLeft} = carouselRef.current;
		const page = Math.ceil(scrollLeft / 1000) + 1;
		set_currentPage(page);
	};

	/**********************************************************************************************
	 ** On component mount we shuffle the array of Partners to avoid any bias.
	 **********************************************************************************************/
	useMountEffect(() => {
		if (apps?.length < 1) {
			return;
		}
		set_shuffledApps(apps?.toSorted(() => 0.5 - Math.random()));
	});
	return (
		<Fragment>
			<CategoryHeading
				title={title}
				description={description}
			/>
			{apps?.length > 4 && (
				<CarouselSlideArrows
					onScrollBack={onScrollBack}
					onScrollForward={onScrollForward}
				/>
			)}
			<AppsCarousel
				apps={shuffledApps}
				ref={carouselRef}
				onScroll={onScroll}
			/>
			<CarouselControls
				carouselLength={apps.length}
				onDotsClick={onDotsClick}
				currentPage={currentPage}
			/>
		</Fragment>
	);
};
