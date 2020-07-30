import React from 'react';
import { Field } from 'redux-form';
import Select from 'components/utils/Select';

export default function AddItem(props) {
    const { fields, category } = props;
    return (
        <div className='mt-4'>
            <button type='button' className='btn btn-outline-success mb-2' onClick={() => { fields.push({}) }}>
                Add Item
            </button>
            {
                fields.map((member, index) => {
                    const itemOptions = category.find((i) => Number(props.fields.get(index).CatId) === Number(i.categoryId));
                    return (
                        <div key={`${member}.CatId`} className='form-row'>
                            <div className='col mb-3'>
                                <Field
                                    className='form-control'
                                    placeholder='Cat Id'
                                    name={`${member}.CatId`}
                                    label='Cat Id'
                                    component={Select}
                                    options={category}
                                    valueKey='categoryId'
                                    labelKey='categoryName'
                                />
                            </div>
                            <div className='col mb-3'>
                                <Field
                                    className='form-control'
                                    placeholder='Item Name'
                                    name={`${member}.itemId`}
                                    label='Item Name'
                                    component={Select}
                                    options={itemOptions ? [...itemOptions.categoryItems] : []}
                                    valueKey='itemId'
                                    labelKey='itemName'
                                />
                            </div>
                            <div className='col mb-3'>
                                <label htmlFor={`${member}.ServiceType`}>Service Type</label>
                                <Field
                                    className='form-control'
                                    id={`${member}.serviceType`}
                                    placeholder='Service Type'
                                    name={`${member}.ServiceType`}
                                    component='input'
                                />
                            </div>
                            <div className='col mb-3'>
                                <label htmlFor={`${member}.Price`}>Price</label>
                                <Field
                                    className='form-control'
                                    id={`${member}.price`}
                                    placeholder='Price'
                                    name={`${member}.Price`}
                                    component='input'
                                />
                            </div>
                            <div className='col-lg-1 mb-3'>
                                <button onClick={() => fields.remove(index)} type='button' className='btn btn-outline-danger remove'>Remove</button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}