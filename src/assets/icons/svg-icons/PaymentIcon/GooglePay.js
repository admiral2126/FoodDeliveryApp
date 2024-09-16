import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.48C13.69 6.48 14.83 7.21 15.48 7.82L18.02 5.34C16.46 3.89 14.43 3 12 3C8.47996 3 5.43996 5.02 3.95996 7.96L6.86996 10.22C7.59996 8.05 9.61996 6.48 12 6.48Z" fill="#EA4335"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.64 12.2C20.64 11.46 20.58 10.92 20.45 10.36H12V13.7H16.96C16.86 14.53 16.32 15.78 15.12 16.62L17.96 18.82C19.66 17.25 20.64 14.94 20.64 12.2Z" fill="#4285F4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.88 13.78C6.69 13.22 6.58 12.62 6.58 12C6.58 11.38 6.69 10.78 6.87 10.22L3.96 7.96002C3.35 9.18002 3 10.55 3 12C3 13.45 3.35 14.82 3.96 16.04L6.88 13.78Z" fill="#FBBC05"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9997 21C14.4297 21 16.4697 20.2 17.9597 18.82L15.1197 16.62C14.3597 17.15 13.3397 17.52 11.9997 17.52C9.61973 17.52 7.59973 15.95 6.87973 13.78L3.96973 16.04C5.44973 18.98 8.47973 21 11.9997 21Z" fill="#34A853"/>
</svg>

`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
