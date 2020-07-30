import axios from 'util/requestInstance';
import urls from 'config/urls';
import { SET_ORDERS, UNMOUNT_ORDERS, SET_ORDER_DETAIL } from 'constants/orders';
import { SubmissionError } from 'redux-form';

export function getOrders(data, detail, loading) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: urls.GetOrders,
            data,
        }).then((response) => {
            if (detail) {
                dispatch({
                    type: SET_ORDER_DETAIL,
                    payload: response.data,
                });
            } else {
                dispatch({
                    type: SET_ORDERS,
                    payload: response.data,
                });
            }
            if (loading) {
                loading();
            }
        });
    };
}

export function submitEdit(data, callback, loader) {
    return () => axios({
        method: 'put',
        url: urls.updateOrderDetail,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback();
        } else {
            loader();
            throw new SubmissionError({
                email: 'error',
                _error: response.data,
            });
        }
    });
}

export function getOrderDetail(id) {
    return (dispatch) => {
        axios({
            method: 'get',
            url: urls.GetOrderDetail({ id }),
        }).then((response) => {
            dispatch({
                type: SET_ORDER_DETAIL,
                payload: response.data,
            });
        });
    };
}

export function unmounOrders() {
    return (dispatch) => {
        dispatch({
            type: UNMOUNT_ORDERS,
        });
    };
}