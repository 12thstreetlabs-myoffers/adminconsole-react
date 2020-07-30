import React from 'react';

export default function Edit(props) {
    return (
        <svg className='pointer' onClick={props.onClick} id='edit' width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='20' height='20' fill='white' />
            <rect width='20' height='20' fill='url(#pattern1)' />
            <defs>
                <pattern id='pattern1' patternContentUnits='objectBoundingBox' width='1' height='1'>
                    <use xlinkHref='#image1' transform='scale(0.0333333)' />
                </pattern>
                <image id='image1' width='30' height='30' xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAz1BMVEUAAAAVu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70Vu70SAvZXAAAARHRSTlMAAQIDBAUGBwgKCxIVFhccIygsLTQ9P0VKTE1YXV9hYm1vcHF0dXt8fn+ChYaIiY+UlZebnaOlqq23vL7Z4ujr8fP5+5SrgssAAADwSURBVChTvczJUsJQEEbh/8aAgKIiIIpGxAEHEjVODIok4bz/M7kBKvcGl3pWXf11tfTX+WUrY2F3htOzZG6SviQpdhHaMq9AbKQ284b9TUYyMcDI05SW3Lzhtm4B7pRRcdWMFl819YBQUHL1Pdn7+N7RMZOtIpu3pN6HdF8Hnor8ktT7AItdqchPS2WoDfxoq8MPjto8YDqw1OJrPrE1zxec6RIgXGueCSXdQygdbuJJ4OuUSDqnvIGhdkQkiV8YIlmcUl1xEARBV5IM+MvdmI7cGsxWY5OsUy3lq7TmnKxPrygW5141x6ll2bStf+kHIO1BICyfpA8AAAAASUVORK5CYII=' />
            </defs>
        </svg>
    );
}