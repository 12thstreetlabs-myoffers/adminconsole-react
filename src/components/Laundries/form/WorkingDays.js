import React, { Fragment } from 'react';
import { Field, FieldArray } from 'redux-form';
import Checkbox from 'components/utils/Checkbox';
import WorkingHours from './WorkingHours';

export default function WorkingDays(props) {
    const { fields, workingDays } = props;
    return (
        <div className='mt-4'>
            {
                fields.map((member, index) => {
                    return (
                        <Fragment>
                            <div key={`${member}.isWorkingDay`} className='form-row'>
                                <div>
                                    {workingDays[index].day}
                                </div>
                                <div className='col mb-3'>
                                    <Field
                                        name={`${member}.isWorkingDay`}
                                        label='Is working day'
                                        component={Checkbox}
                                    />
                                </div>
                            </div>
                            <div key={`${member}.workingDays`} className='form-row'>
                                <FieldArray name={`${member}.workingHours`}  component={WorkingHours} />
                            </div>
                        </Fragment>
                        
                    );
                })
            }
        </div>
    );
}