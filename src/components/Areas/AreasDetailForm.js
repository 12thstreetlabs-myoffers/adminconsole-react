import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Select from 'components/utils/Select';
function AreasDetailForm(props) {
    const { handleSubmit, pristine, submitting, onSubmit, error ,categoryAreas } = props;
    console.log("Categories*********");
    console.log(categoryAreas);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='order-detail-form'>
            { error && (
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            ) }
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='AreaId<'>Area ID</label>
                    <Field
                        className='form-control'
                        id='AreaId'
                        placeholder='Area ID'
                        name='AreaId'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                     <label htmlFor='Category Area'>Category Area</label>
                    <Field
                        className='form-control'
                        placeholder='CategoryArea'
                        name="CatAreaId"
                        component={Select}
                        options={categoryAreas}
                        valueKey='CatAreaId'
                        labelKey='CategoryArea'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='Area'>Area</label>
                    <Field
                        className='form-control'
                        id='Area'
                        placeholder='Area'
                        name='Area'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='Area_ar'>Area(Arabic)</label>
                    <Field
                        className='form-control'
                        id='Area_ar'
                        placeholder='Area_ar'
                        name='Area_ar'
                        component='input'
                    />
                </div>
            </div>
            <button className='btn btn-primary submit' type='submit' disabled={pristine || submitting}>Save</button>
            <Link to={'/areas/'} role='button' className='btn btn-outline-primary detail-button ml-3'>Cancel</Link>
        </form>
    );
}

export default reduxForm({ form: 'AreasDetailForm' })(AreasDetailForm);
