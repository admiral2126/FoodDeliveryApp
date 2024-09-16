import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.3077 5H3.69231C3.30996 5 3 5.34822 3 5.77778V18.2222C3 18.6518 3.30996 19 3.69231 19H20.3077C20.69 19 21 18.6518 21 18.2222V5.77778C21 5.34822 20.69 5 20.3077 5Z" stroke="#322E2C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.75 15.75H17.75" stroke="#322E2C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.25 15.75H11.75" stroke="#322E2C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 9L21 9" stroke="#322E2C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
