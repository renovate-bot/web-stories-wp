/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { PAGE_NAV_WIDTH, PAGE_WIDTH, PAGE_HEIGHT } from '../../constants';
import Page from './page';
import PageMenu from './pagemenu';
import PageNav from './pagenav';
import Carousel from './carousel';
import SelectionCanvas from './selectionCanvas';

const PAGE_PADDING = 30;

const Background = styled.div`
	background-color: ${ ( { theme } ) => theme.colors.bg.v1 };
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;

	display: grid;
	grid:
    ".         .         .         .         .       " minmax(${ PAGE_PADDING }px, 1fr)
    ".         prev      page      next      .       " ${ PAGE_HEIGHT }px
    ".         .         menu      .         .       " 48px
    ".         .         .         .         .       " minmax(${ PAGE_PADDING }px, 1fr)
    "carousel  carousel  carousel  carousel  carousel" auto
    / 1fr ${ PAGE_NAV_WIDTH }px ${ PAGE_WIDTH }px ${ PAGE_NAV_WIDTH }px 1fr;
`;

const Area = styled.div`
	grid-area: ${ ( { area } ) => area };
	height: 100%;
	width: 100%;
`;

function CanvasLayout() {
	// @todo SelectionCanvas should not be there, will be addressed separately.
	return (
		<Background>
			<Area area="page">
				<SelectionCanvas>
					<Page />
				</SelectionCanvas>
			</Area>
			<Area area="menu">
				<PageMenu />
			</Area>
			<Area area="prev">
				<PageNav isNext={ false } />
			</Area>
			<Area area="next">
				<PageNav />
			</Area>
			<Area area="carousel">
				<Carousel />
			</Area>
		</Background>
	);
}

export default CanvasLayout;
