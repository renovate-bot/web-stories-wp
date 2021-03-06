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
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * WordPress dependencies
 */
import { useRef, useEffect, useCallback, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import getCaretCharacterOffsetWithin from '../../utils/getCaretCharacterOffsetWithin';
import { useStory, useFont } from '../../app';
import { useCanvas } from '../../components/canvas';
import {
	ElementFillContent,
	ElementWithFont,
	ElementWithBackgroundColor,
	ElementWithFontColor,
	ElementWithStyle,
} from '../shared';
import { generateFontFamily } from './util';

const Element = styled.p`
	margin: 0;
	${ ElementFillContent }
	${ ElementWithFont }
	${ ElementWithBackgroundColor }
	${ ElementWithFontColor }
	${ ElementWithStyle }

	user-select: ${ ( { canSelect } ) => canSelect ? 'initial' : 'none' };

	&:focus {
		outline: none;
	}
`;

function TextDisplay( {
	id,
	content,
	color,
	backgroundColor,
	width,
	height,
	fontFamily,
	fontFallback,
	fontSize,
	fontWeight,
	fontStyle,
	letterSpacing,
	lineHeight,
	padding,
	textAlign,
} ) {
	const props = {
		color,
		backgroundColor,
		fontFamily: generateFontFamily( fontFamily, fontFallback ),
		fontFallback,
		fontStyle,
		fontSize,
		fontWeight,
		letterSpacing,
		lineHeight,
		padding,
		width,
		height,
		textAlign,
	};
	const {
		state: { selectedElementIds },
	} = useStory();
	const {
		actions: { maybeEnqueueFontStyle },
	} = useFont();

	const {
		actions: { setEditingElement, setEditingElementWithState },
	} = useCanvas();
	const isElementSelected = selectedElementIds.includes( id );
	const isElementOnlySelection = isElementSelected && selectedElementIds.length === 1;
	const [ hasFocus, setHasFocus ] = useState( false );
	useEffect( () => {
		if ( isElementOnlySelection ) {
			const timeout = window.setTimeout( setHasFocus, 300, true );
			return () => {
				window.clearTimeout( timeout );
			};
		}

		clickTime.current = 0;
		setHasFocus( false );
		return undefined;
	}, [ isElementOnlySelection ] );

	useEffect( () => {
		maybeEnqueueFontStyle( fontFamily );
	}, [ fontFamily, maybeEnqueueFontStyle ] );

	const clickTime = useRef();
	const handleMouseDown = useCallback( () => {
		clickTime.current = window.performance.now();
	}, [] );
	const handleMouseUp = useCallback( ( evt ) => {
		const timingDifference = window.performance.now() - clickTime.current;
		if ( timingDifference > 100 ) {
			// Only short clicks count
			return;
		}
		// Enter editing mode and place cursor at current selection offset
		evt.stopPropagation();
		setEditingElementWithState( id, { offset: getCaretCharacterOffsetWithin( element.current, evt.clientX, evt.clientY ) } );
	}, [ id, setEditingElementWithState ] );

	const handleKeyDown = ( evt ) => {
		if ( evt.metaKey || evt.altKey || evt.ctrlKey ) {
			// Some modifier (except shift) was pressed. Ignore and bubble
			return;
		}

		if ( evt.key === 'Enter' ) {
			// Enter editing without writing or selecting anything
			setEditingElement( id );
			evt.stopPropagation();
			// Make sure no actual Enter is pressed
			evt.preventDefault();
		} else if ( /^\w$/.test( evt.key ) ) {
			// TODO: in above check all printable characters across alphabets, no just a-z0-9 as \w is
			// Enter editing and clear content (first letter will be correctly inserted from keyup)
			setEditingElementWithState( id, { clearContent: true } );
			evt.stopPropagation();
		}

		// ignore everything else and bubble.
	};

	if ( hasFocus ) {
		props.onKeyDown = handleKeyDown;
		props.onMouseDown = handleMouseDown;
		props.onMouseUp = handleMouseUp;
		props.tabIndex = 0;
	}

	const element = useRef();
	useEffect( () => {
		if ( isElementOnlySelection && element.current ) {
			element.current.focus();
		}
	}, [ isElementOnlySelection ] );

	return (
		<Element
			canSelect={ hasFocus }
			ref={ element }
			dangerouslySetInnerHTML={ { __html: content } }
			{ ...props }
		/>
	);
}

TextDisplay.propTypes = {
	id: PropTypes.string.isRequired,
	content: PropTypes.string,
	color: PropTypes.string,
	backgroundColor: PropTypes.string,
	fontFamily: PropTypes.string,
	fontFallback: PropTypes.array,
	fontSize: PropTypes.number,
	fontWeight: PropTypes.number,
	fontStyle: PropTypes.string,
	letterSpacing: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
	] ),
	lineHeight: PropTypes.number,
	padding: PropTypes.number,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	setClickHandler: PropTypes.func,
	textAlign: PropTypes.string,
};

export default TextDisplay;
