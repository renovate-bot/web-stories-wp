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
import Header from '../../components/header';
import Inspector from '../../components/inspector';
import Library from '../../components/library';
import Canvas from '../../components/canvas';
import { ADMIN_TOOLBAR_HEIGHT, LIBRARY_MIN_WIDTH, LIBRARY_MAX_WIDTH, INSPECTOR_MIN_WIDTH, INSPECTOR_MAX_WIDTH, HEADER_HEIGHT } from '../../constants';
import DropZoneProvider from '../../components/dropzone/dropZoneProvider';

const Editor = styled.div`
	font-family: ${ ( { theme } ) => theme.fonts.body1.family };
	font-size: ${ ( { theme } ) => theme.fonts.body1.size };
	line-height: ${ ( { theme } ) => theme.fonts.body1.lineHeight };
	letter-spacing: ${ ( { theme } ) => theme.fonts.body1.letterSpacing };
	background-color: ${ ( { theme } ) => theme.colors.bg.v1 };
	position: absolute;
	left: -20px;
	top: 0;
	right: 0;
	bottom: 0;
	height: calc(100vh - ${ ADMIN_TOOLBAR_HEIGHT }px);

	display: grid;
	grid:
		"lib  head  insp" ${ HEADER_HEIGHT }px
		"lib  canv  insp" 1fr
		/ minmax(${ LIBRARY_MIN_WIDTH }px, ${ LIBRARY_MAX_WIDTH }px) 1fr minmax(${ INSPECTOR_MIN_WIDTH }px, ${ INSPECTOR_MAX_WIDTH }px);
`;

const Area = styled.div`
  grid-area: ${ ( { area } ) => area };
  position: relative;
`;

function Layout() {
	return (
		<Editor>
			<Area area="head">
				<Header />
			</Area>
			<Area area="lib">
				<Library />
			</Area>
			<Area area="canv">
				<DropZoneProvider>
					<Canvas />
				</DropZoneProvider>
			</Area>
			<Area area="insp">
				<Inspector />
			</Area>
		</Editor>
	);
}

export default Layout;
