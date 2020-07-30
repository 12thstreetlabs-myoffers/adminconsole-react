import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

function CategoryDetailForm(props) {
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
                    <label htmlFor='Category ID'>Category ID</label>
                    <Field
                        className='form-control'
                        id='CatId'
                        placeholder='Category ID'
                        name='CatId'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='Category Name'>Category Name</label>
                    <Field
                        className='form-control'
                        id='CategoryName'
                        placeholder='Category Name'
                        name='CategoryName'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='Category Image'>Category Image</label>
                    <Field
                        className='form-control'
                        id='CategoryImage'
                        placeholder='Category Image'
                        name='CategoryImage'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='Category Name(Ar)'>Category Name(Ar)</label>
                    <Field
                        className='form-control'
                        id='CategoryName_ar'
                        placeholder='Category Name(Ar)'
                        name='CategoryName_ar'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='Parent Id'>Parent Id</label>
                    <Field
                        className='form-control'
                        id='ParentId'
                        placeholder='Parent Id'
                        name='ParentId'
                        component='input'
                    />
                </div>
            </div>
            <button className='btn btn-primary submit' type='submit' disabled={pristine || submitting}>Save</button>
            <Link to={'/categories/'} role='button' className='btn btn-outline-primary detail-button ml-3'>Cancel</Link>
        </form>
    );
}

export default reduxForm({ form: 'CategoryDetailForm' })(CategoryDetailForm);
