import React from 'react';

export default function Modal(props) {
    return (
        <div className={`modal fade show ${props.className}`} tabIndex='-1' role='dialog' style={{display: 'block', paddingRight: '15px'}} aria-modal='true'>
            <div className={`modal-dialog ${props.positionClass}`} role='document'>
                {props.children}
            </div>
        </div>
    );
}