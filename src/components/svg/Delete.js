import React from 'react';

export default function Delete(props) {
    return (
        <svg onClick={props.onClick} className='pointer' id='delete' width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='20' height='20' fill='white' />
            <rect width='20' height='20' fill='url(#pattern0)' />
            <defs>
                <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
                    <use xlinkHref='#image0' transform='scale(0.0333333)' />
                </pattern>
                <image id='image0' width='30' height='30' xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAdVBMVEUAAAAVu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu72irDxCAAAAJnRSTlMAAQIFDA4SFSIoLC4vOjw/QEFCREVVYoOMlKCyt7nBzNHm6fP3/b/fmNUAAACWSURBVCiR7ZPHDsMgEEQJTtu0Jb3HKfb8/yfGMcbBLFYuPuYdRqN9CCEBSjlmOSouWgn0CzVbqZfAwLY9Hj2h7zhVbQRMv3MyH3bAwVhWGW5l4aTQaIcLnbZrKrc3gDiKN+tAJ0x+hJqbEepY/PUvTUj96OxCFxG9QebqGBiG+oirq/oZe4freukkl/bs/ZT+3DRhsvYNZpIxm05Ggy0AAAAASUVORK5CYII=' />
            </defs>
        </svg>

    );
}