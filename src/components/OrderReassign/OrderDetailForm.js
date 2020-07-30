import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

function OrderDetailForm(props) {
    console.log("Inside Order Detail Form Reassign");
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
                    <label htmlFor='CustomerId'>Customer ID</label>
                    <Field
                        className='form-control'
                        id='CustomerId'
                        placeholder='Customer ID'
                        name='CustomerId'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='FirstName'>Customer Name</label>
                    <Field
                        className='form-control'
                        id='FirstName'
                        placeholder='Customer Name'
                        name='FirstName'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='DeliveryCharge'>Delivery Charge</label>
                    <Field
                        className='form-control'
                        id='DeliveryCharge'
                        placeholder='Delivery Charge'
                        name='DeliveryCharge'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
            </div>
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='OrderDate'>Order Date</label>
                    <Field
                        className='form-control'
                        id='OrderDate'
                        placeholder='Order Date'
                        name='OrderDate'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='DeliveryTime'>Delivery Time</label>
                    <Field
                        className='form-control'
                        id='DeliveryTime'
                        placeholder='Delivery Time'
                        name='DeliveryTime'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='PaymentClearedDate'>Payment Cleared Date</label>
                    <Field
                        className='form-control'
                        id='PaymentClearedDate'
                        placeholder='Payment Cleared Date'
                        name='PaymentClearedDate'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
            </div>
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='OrderStatus'>Order Status</label>
                    <Field
                        className='form-control'
                        id='OrderStatus'
                        placeholder='Order Status'
                        name='OrderStatus'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='FinalAmount'>Amount</label>
                    <Field
                        className='form-control'
                        id='FinalAmount'
                        placeholder='Amount'
                        name='FinalAmount'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='PaymentType'>Payment Type</label>
                    <Field
                        className='form-control'
                        id='PaymentType'
                        placeholder='Payment Type'
                        name='PaymentType'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
            </div>
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='ProviderId'>Provider ID</label>
                    <Field
                        className='form-control'
                        id='ProviderId'
                        placeholder='Provider ID'
                        name='ProviderId'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='ProviderName'>Provider Name</label>
                    <Field
                        className='form-control'
                        id='ProviderName'
                        placeholder='Provider Name'
                        name='ProviderName'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='Ratings'>Ratings</label>
                    <Field
                        className='form-control'
                        id='Ratings'
                        placeholder='Ratings'
                        name='Ratings'
                        component='input'
                        props={{ disabled: true }}
                    />
                </div>
            </div>
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='DeliveryAddress'>Delivery Address</label>
                    <Field
                        className='form-control'
                        id='DeliveryAddress'
                        placeholder='Delivery Address'
                        name='DeliveryAddress'
                        component='textarea'
                        props={{ disabled: true }}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='Notes'>Notes</label>
                    <Field
                        className='form-control'
                        id='Notes'
                        placeholder='Notes'
                        name='Notes'
                        component='textarea'
                        props={{ disabled: true }}
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col mb-3'>
                    <label>Items</label>
                    <div className='col items'>
                        <div className='row'>
                            {
                                props.orderServiceMap.map((i, index) => {
                                    const item = i[1][0];
                                    return <div className='col-4'>
                                        <div className='order-item'>
                                            <div className='row'>
                                                <div className='col-lg-6 txt-block'>
                                                    <p>Item ID: {item.ItemId}</p>
                                                    <p>Item Name: {item.ItemName}</p>
                                                    <p>Service Type: {item.ServiceType}</p>
                                                    <p>Count:
                                                        <Field
                                                            className='form-control'
                                                            id='Count'
                                                            placeholder='Count'
                                                            name={`ItemList.${index}.count`}
                                                            component='input'
                                                            props={{ disabled: true }}
                                                        />
                                                    </p>
                                                    <p>Price:
                                                        <Field
                                                            className='form-control'
                                                            id='Price'
                                                            placeholder='Price'
                                                            name={`ItemList.${index}.price`}
                                                            component='input'
                                                            props={{ disabled: true }}
                                                        />
                                                    </p>
                                                </div>
                                                <div className='col-lg-6 img-block'>
                                                    <div className='image-container'>
                                                        <img src={i[1][0].ItemImage} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>;
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Link to={'/orderReassign/'} role='button' className='btn btn-outline-primary detail-button ml-3'>Back</Link>
        </form>
    );
}

export default reduxForm({ form: 'OrderDetailForm' })(OrderDetailForm);
