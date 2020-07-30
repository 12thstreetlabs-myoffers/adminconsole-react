import React from 'react';

export default function Checkbox(props) {
    return (
        <div className='form-check'>
            <input className='form-check-input' type='checkbox' id={props.input.name} {...props.input} checked={props.input.value} />
                <label className='form-check-label' htmlFor={props.input.name}>
                    {props.label}
                </label>
        </div>
    );
}