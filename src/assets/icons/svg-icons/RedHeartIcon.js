import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.001 20.5C12.001 20.5 2.62598 15.25 2.62598 8.87501C2.62617 7.74826 3.01659 6.65635 3.73086 5.78493C4.44514 4.91351 5.43917 4.31636 6.54397 4.09501C7.64876 3.87367 8.79612 4.04179 9.79096 4.57079C10.7858 5.09979 11.5667 5.95702 12.001 6.99673L12.001 6.99673C12.4352 5.95702 13.2161 5.09979 14.211 4.57079C15.2058 4.04179 16.3532 3.87367 17.458 4.09501C18.5628 4.31636 19.5568 4.91351 20.2711 5.78493C20.9854 6.65635 21.3758 7.74826 21.376 8.87501C21.376 15.25 12.001 20.5 12.001 20.5Z" fill="#E71F1F" stroke="#E71F1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
