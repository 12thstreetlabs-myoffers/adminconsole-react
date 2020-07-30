import React, { Fragment } from 'react';
import { Field, FieldArray } from 'redux-form';
import Checkbox from 'components/utils/Checkbox';
import Select from '../../utils/Select';

export default function WorkingHours(props) {
    const { fields } = props;
    return (
        <Fragment>
            <div className='w-100 pl-1'>
                <button type='button' className='btn btn-outline-success mb-2' onClick={() => { fields.push('') }}>
                    Add Hours
                </button>
            </div>
            {
                fields.map((member, index) => {
                    return (
                        <div key={member} className='col-lg-3 mb-3 add-hours'>
                            <Field
                                className='form-control'
                                placeholder='Hours'
                                name={member}
                                component='input'
                            />
                            <button onClick={() => fields.remove(index)} type='button' className='btn btn-outline-danger remove'>Remove</button>
                        </div>
                    );
                })
            }
        </Fragment>
    );
}