import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Select from 'components/utils/Select';

function ReassignProviderForm(props) {
    const {
        handleSubmit, pristine, submitting,onSubmit, error,providerList,orderId
    } = props;
    return (
                <form onSubmit={handleSubmit(onSubmit)}>
                        <Field
                                    className='form-control'
                                    placeholder='ProviderId'
                                    name={"Order:"+orderId}
                                    component={Select}
                                    options={providerList}
                                    valueKey='ProviderId'
                                    labelKey='Name'
                                />
                        <button type="submit">Assign</button>

                </form>
            );
        }
export default reduxForm({ form: 'ReassignProviderForm' })(ReassignProviderForm);