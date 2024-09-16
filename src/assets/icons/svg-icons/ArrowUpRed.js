import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 14L12 10L17 14" stroke="#A21C14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
