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
 * Internal dependencies
 */
import { PanelTypes } from '../../panels';
export { default as Display } from './display';
export { default as Edit } from './edit';
export { default as Save } from './save';
export { default as TextContent } from './textContent';

export const defaultAttributes = {
	fontFamily: 'Arial',
	fontFallback: [ 'Helvetica Neue', 'Helvetica', 'sans-serif' ],
	fontWeight: 400,
	fontSize: 14,
	fontStyle: 'normal',
	color: '#000000',
	backgroundColor: '#ffffff',
	letterSpacing: 'normal',
	lineHeight: 1.3,
	textAlign: 'initial',
};

export const hasEditMode = true;

export const panels = [
	PanelTypes.TEXT,
	PanelTypes.SIZE,
	PanelTypes.POSITION,
	PanelTypes.FONT,
	PanelTypes.STYLE,
	PanelTypes.COLOR,
	PanelTypes.BACKGROUND_COLOR,
	PanelTypes.ROTATION_ANGLE,
];
