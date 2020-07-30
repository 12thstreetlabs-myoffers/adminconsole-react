import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
function GoCreditDetailForm(props) {
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
                    <label htmlFor='PackageId<'>Package ID</label>
                    <Field
                        className='form-control'
                        id='PackageId'
                        placeholder='Package ID'
                        name='PackageId'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='Title'>Title</label>
                    <Field
                        className='form-control'
                        id='Title'
                        placeholder='Title'
                        name='Title'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='CreditPoints'>Credit Points</label>
                    <Field
                        className='form-control'
                        id='CreditPoints'
                        placeholder='Credit_Points'
                        name='CreditPoints'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='DeliveryCharge'>Price</label>
                    <Field
                        className='form-control'
                        id='Price'
                        placeholder='Price'
                        name='Price'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='OfferText'>OfferText</label>
                    <Field
                        className='form-control'
                        id='OfferText'
                        placeholder='OfferText'
                        name='OfferText'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='Enable'>Enable</label>
                    <Field
                        className='form-control'
                        id='Enable'
                        placeholder='Enable'
                        name='Enable'
                        component='input'
                        />
                </div>
            </div>
            <button className='btn btn-primary submit' type='submit' disabled={pristine || submitting}>Save</button>
            <Link to={'/goCredit/'} role='button' className='btn btn-outline-primary detail-button ml-3'>Cancel</Link>
        </form>
    );
}

export default reduxForm({ form: 'GoCreditDetailForm' })(GoCreditDetailForm);
