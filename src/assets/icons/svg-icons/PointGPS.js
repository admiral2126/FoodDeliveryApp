import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="20" fill="#A11C14" fill-opacity="0.3"/>
<circle cx="20" cy="20" r="8" fill="#A21C14"/>
<line x1="20" y1="20" x2="20" y2="52" stroke="#A21C14" stroke-width="2"/>
</svg>
`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
