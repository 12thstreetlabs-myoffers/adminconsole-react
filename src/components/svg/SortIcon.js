import React from 'react';

export default function SortIcon(props) {
    return (
        <svg onClick={props.onClick} className={`sort-icon ${props.className}`} width='23' height='19' viewBox='0 0 23 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M9.77778 1.37143H22' stroke='#15BBBD' strokeWidth='2' strokeLinecap='round'/>
            <path d='M13.4444 8.57144H22' stroke='#15BBBD' strokeWidth='2' strokeLinecap='round'/>
            <path d='M18.3333 16.3714H22' stroke='#15BBBD' strokeWidth='2' strokeLinecap='round'/>
            <path fillRule='evenodd' clipRule='evenodd' d='M5.49988 16.5959L1 11.9116L5.49988 16.5959V16.5959Z' stroke='#5861A2' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
            <path d='M5.49947 1L5.49947 15.5487' stroke='#5861A2' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
            <path d='M5.5 16.5959L9.99988 11.9116' stroke='#5861A2' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
        </svg>

    );
}