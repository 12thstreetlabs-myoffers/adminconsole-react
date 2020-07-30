import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

function ItemDetailForm(props) {
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
                    <label htmlFor='ItemId'>Item ID</label>
                    <Field
                        className='form-control'
                        id='ItemId'
                        placeholder='Item Id'
                        name='ItemId'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='ItemName'>Item Name</label>
                    <Field
                        className='form-control'
                        id='ItemName'
                        placeholder='Item Name'
                        name='ItemName'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='DeliveryCharge'>Item Name(Ar)</label>
                    <Field
                        className='form-control'
                        id='ItemName_ar'
                        placeholder='Item Name(Ar)'
                        name='ItemName_ar'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='ItemDesc'>Item Desc</label>
                    <Field
                        className='form-control'
                        id='ItemDesc'
                        placeholder='Item Description'
                        name='ItemDesc'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='ItemDesc_ar'>Item Desc(Ar)</label>
                    <Field
                        className='form-control'
                        id='ItemDesc_ar'
                        placeholder='Item Desc(Ar)'
                        name='ItemDesc_ar'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='ItemImage'>Item Image</label>
                    <Field
                        className='form-control'
                        id='ItemImage'
                        placeholder='Item Image'
                        name='ItemImage'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='CatId'>Category Id</label>
                    <Field
                        className='form-control'
                        id='CatId'
                        placeholder='Category Id'
                        name='CatId'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='DeliveryCharge'>Category Name</label>
                    <Field
                        className='form-control'
                        id='CategoryName'
                        placeholder='Category Name'
                        name='CategoryName'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
            </div>
            <button className='btn btn-primary submit' type='submit' disabled={pristine || submitting}>Save</button>
            <Link to={'/items/'} role='button' className='btn btn-outline-primary detail-button ml-3'>Cancel</Link>
        </form>
    );
}

export default reduxForm({ form: 'ItemDetailForm' })(ItemDetailForm);