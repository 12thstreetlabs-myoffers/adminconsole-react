import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import AddItems from './AddItems';
import WorkingDays from './WorkingDays';
import Select from 'components/utils/Select';


function OrderDetailForm(props) {
    const {
        handleSubmit, pristine, submitting, category, initialValues, onSubmit, error,areas
    } = props;
    console.log(initialValues);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='order-detail-form mb-5'>
            { error && (
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            ) }
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='name'>Name</label>
                    <Field
                        className='form-control'
                        id='name'
                        placeholder='Name'
                        name='name'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='bannerUrl'>Banner Url</label>
                    <Field
                        className='form-control'
                        id='bannerUrl'
                        placeholder='Banner Url'
                        name='bannerUrl'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='deliveryCharge'>Delivery Charge</label>
                    <Field
                        className='form-control'
                        id='deliveryCharge'
                        placeholder='Delivery Charge'
                        name='deliveryCharge'
                        component='input'
                    />
                </div>
            </div>
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='email'>Email</label>
                    <Field
                        className='form-control'
                        id='email'
                        placeholder='Email'
                        name='email'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='goCreditEnabled'>Go Credit Enabled</label>
                    <Field
                        className='form-control'
                        id='goCreditEnabled'
                        placeholder='Go Credit Enabled'
                        name='goCreditEnabled'
                        component='select'
                    >
                     <option />
                     <option value="true">true</option>
                     <option value="false">false</option>
                     </Field>
                </div>
                <div className='col mb-3'>
                    <label htmlFor='iconUrl'>Icon Url</label>
                    <Field
                        className='form-control'
                        id='iconUrl'
                        placeholder='Icon Url'
                        name='iconUrl'
                        component='input'
                    />
                </div>
            </div>
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='minimumOrder'>Minimum Order</label>
                    <Field
                        className='form-control'
                        id='minimumOrder'
                        placeholder='Minimum Order'
                        name='minimumOrder'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='address'>Address</label>
                    <Field
                        className='form-control'
                        id='address'
                        placeholder='Address'
                        name='address'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                     <label htmlFor='Area'> Area</label>
                    <Field
                        className='form-control'
                        placeholder="area"
                        name="area"
                        component={Select}
                        options={areas}
                        valueKey='area'
                        labelKey='area'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='paymentType'>Payment Type</label>
                    <Field
                        className='form-control'
                        id='paymentType'
                        placeholder='Payment Type'
                        name='paymentType'
                        component='select'
                    >
                    <option />
                     <option value="ONL">ONL</option>
                     <option value="COD">COD</option>
                     <option value="ONL,COD">ONL,COD</option>
                     </Field>
                </div>

            </div>
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='ProviderId'>Phone</label>
                    <Field
                        className='form-control'
                        id='phone'
                        placeholder='Phone'
                        name='phone'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='providerId'>Provider Id</label>
                    <Field
                        className='form-control'
                        id='providerId'
                        placeholder='Provider Id'
                        name='providerId'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='rating'>Ratings</label>
                    <Field
                        className='form-control'
                        id='rating'
                        placeholder='Rating'
                        name='rating'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
            </div>
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='specialServices'>Special Services</label>
                    <Field
                        className='form-control'
                        id='specialServices'
                        placeholder='Special Services'
                        name='specialServices'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='totalReviews'>Provider Type</label>
                    <Field
                        className='form-control'
                        id='providerType'
                        placeholder='Provider Type'
                        name='providerType'
                        component='select'
                    >
                    <option />
                     <option value="PRO">PRO</option>
                     <option value="PPRO">PPRO</option>
                     </Field>
                </div>
                <div className='col mb-3'>
                    <label htmlFor='totalReviews'>Total Reviews</label>
                    <Field
                        className='form-control'
                        id='totalReviews'
                        placeholder='Total Reviews'
                        name='totalReviews'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
            </div>
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='paymentDue'>Payment Due</label>
                    <Field
                        className='form-control'
                        id='paymentDue'
                        placeholder='Payment Due'
                        name='paymentDue'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='PaymentClearedDate'>PaymentClearedDate</label>
                    <Field
                        className='form-control'
                        id='paymentClearedDate'
                        placeholder='paymentClearedDate'
                        name='paymentClearedDate'
                        component='input'
                    />
                </div>
            </div>
            <div className='form-row'>
                <div className='col'>
                    Items
                </div>
            </div>
            <FieldArray name='itemList' component={AddItems} category={category} />
            <FieldArray name='workingHours' component={WorkingDays} workingDays={initialValues.workingHours} />
            <button disabled={pristine || submitting} className='btn btn-primary submit' type='submit'>Save</button>
            <Link to={'/laundries/'} role='button' className='btn btn-outline-primary detail-button ml-3'>Cancel</Link>
        </form>
    );
}

export default reduxForm({ form: 'OrderDetailForm' })(OrderDetailForm);
