import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="8" fill="#322E2C"/>
<path d="M11 11L5 5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
<path d="M5 11L11 5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
