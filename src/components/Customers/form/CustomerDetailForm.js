import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Select from 'components/utils/Select';
import { Link } from 'react-router-dom';

function CustomerDetailForm(props) {
    const {
        handleSubmit, pristine, submitting, onSubmit, error, create
    } = props;
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='order-detail-form mb-5'>
            { error && (
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            ) }
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='firstName'>First Name</label>
                    <Field
                        className='form-control'
                        id='firstName'
                        placeholder='First Name'
                        name='firstName'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='lastName'>Last Name</label>
                    <Field
                        className='form-control'
                        id='lastName'
                        placeholder='Last Name'
                        name='lastName'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='gender'>Gender</label>
                    <Field
                        className='form-control'
                        id='gender'
                        placeholder='Gender'
                        name='gender'
                        component="select">
                     <option />
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                     </Field>
                </div>
            </div>
            <div className='form-row'>
                {
                    create && (
                        <div className='col mb-3'>
                            <label htmlFor='password'>Password</label>
                            <Field
                                className='form-control'
                                id='password'
                                placeholder='Password'
                                name='password'
                                component='input'
                            />
                        </div>
                    )
                }
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
                    <label htmlFor='goCreditBalance'>Go Credit Balance</label>
                    <Field
                        className='form-control'
                        id='goCreditBalance'
                        placeholder='Go Credit Balance'
                        name='goCreditBalance'
                        component='input'
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='customerType'>Customer Type</label>
                    <Field
                        className='form-control'
                        id='customerType'
                        placeholder='Customer Type'
                        name='customerType'
                        component='select'
                    >
                    <option />
                     <option value="NOR">NOR</option>
                     <option value="COM">COM</option>
                     </Field>
                </div>
            </div>
            <div className='form-row'>
                <div className='col mb-3'>
                    <label htmlFor='customerType'>Favorites</label>
                    <Field
                        className='form-control'
                        id='favourites'
                        placeholder='Favorites'
                        name='favourites'
                        component='input'
                        props={{disabled:true}}
                    />
                </div>
                <div className='col mb-3'>
                    <label htmlFor='phone'>Phone</label>
                    <Field
                        className='form-control'
                        id='phone'
                        placeholder='Phone'
                        name='phone'
                        component='input'
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col mb-3'>
                    <label htmlFor='address'>Address Line</label>
                    <Field
                        className='form-control'
                        id='address'
                        placeholder='Address Line'
                        name='address'
                        component='input'
                    />
                </div>
            </div>
            <button className='btn btn-primary submit' type='submit' disabled={pristine || submitting}>Save</button>
            <Link role='button' className='btn btn-secondary ml-3' to='/customers/'>Cancel</Link>
        </form>
    );
}

export default reduxForm({ form: 'CustomerDetailForm' })(CustomerDetailForm);
