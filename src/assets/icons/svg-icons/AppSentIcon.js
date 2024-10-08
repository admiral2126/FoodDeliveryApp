import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M59.125 35.75L38.9582 55L28.875 45.375" stroke="#322E2C" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M44 77C62.2254 77 77 62.2254 77 44C77 25.7746 62.2254 11 44 11C25.7746 11 11 25.7746 11 44C11 62.2254 25.7746 77 44 77Z" stroke="#322E2C" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
