import axios from 'util/requestInstance';
import urls from 'config/urls';
import { SET_CUSTOMERS, UNMOUNT_CUSTOMERS, SET_CUSTOMER_DETAIL } from 'constants/customers';
import { SubmissionError } from 'redux-form';

export function getCustomers(data) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: urls.getCustomers,
            data,
        }).then((response) => {
            dispatch({
                type: SET_CUSTOMERS,
                payload: response.data.data,
            });
        });
    };
}

export function getCustomerDetail(id) {
    return (dispatch) => {
        axios({
            method: 'get',
            url: urls.customerDetail({ id }),
        }).then((response) => {
            dispatch({
                type: SET_CUSTOMER_DETAIL,
                payload: response.data,
            });
        });
    };
}


export function submitEdit(data, callback, loading) {
    return () => axios({
        method: 'post',
        url: urls.updateCustomer,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback();
        } else {
            loading();
            throw new SubmissionError({
                email: 'error',
                _error: response.data,
            });
        }
    });
}


export function submitCreate(data, callback, loading) {
    return () => axios({
        method: 'post',
        url: urls.createCustomer,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback(response.data.data.customerId);
        } else {
            loading();
            throw new SubmissionError({
                email: 'error',
                _error: response.data.message,
            });
        }
    });
}

export function deleteCustomer(data, callback) {
    return () => axios({
        method: 'delete',
        url: urls.deleteCustomer,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback();
        }
    });
}

export function unmounCustomers() {
    return (dispatch) => {
        dispatch({
            type: UNMOUNT_CUSTOMERS,
        });
    };
}
