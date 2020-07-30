import React from 'react';

export default function Select(props) {
    return (
        <div className='form-group'>
            <label htmlFor={props.input.name}>{props.label}</label>
            <select className='form-control' id={props.input.name} {...props.input}>
                {
                    props.options && props.options.map((item) => {
                        return <option selected={props.input.value === item[props.valueKey]} value={item[props.valueKey]} key={`${props.input.name}-${item[props.valueKey]}`}>{item[props.labelKey]}</option>;
                    })
                }
            </select>
        </div>
    );
}