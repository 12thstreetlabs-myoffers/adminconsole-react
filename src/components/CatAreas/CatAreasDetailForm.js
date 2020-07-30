import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Select from 'components/utils/Select';
function CatAreasDetailForm(props) {
    const { handleSubmit, pristine, submitting, onSubmit, error } = props;
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='order-detail-form'>
            { error && (
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            ) }
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='CatAreaId<'>Cat Area ID</label>
                    <Field
                        className='form-control'
                        id='CatAreaId'
                        placeholder='CatArea ID'
                        name='CatAreaId'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                     <label htmlFor='Category Area'>Category Area</label>
                    <Field
                        className='form-control'
                        id='CategoryArea'
                        placeholder='CategoryArea'
                        name="CategoryArea"
                        component="input"
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='CategoryArea_ar'>Cartegory Area(Arabic)</label>
                    <Field
                        className='form-control'
                        id='CategoryArea_ar'
                        placeholder='CategoryArea_ar'
                        name='CategoryArea_ar'
                        component='input'
                    />
                </div>
            </div>
            <button className='btn btn-primary submit' type='submit' disabled={pristine || submitting}>Save</button>
            <Link to={'/catAreas/'} role='button' className='btn btn-outline-primary detail-button ml-3'>Cancel</Link>
        </form>
    );
}

export default reduxForm({ form: 'CatAreasDetailForm' })(CatAreasDetailForm);
