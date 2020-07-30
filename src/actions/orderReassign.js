import axios from 'util/requestInstance';
import urls from 'config/urls';
import { SET_REASSIGNORDERS, UNMOUNT_REASSIGNORDERS, SET_REASSIGNORDER_DETAIL } from 'constants/orderReassign';
import { SubmissionError } from 'redux-form';

export function getOrders(data, detail, loading) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: urls.getOrderReassignData,
            data,
        }).then((response) => {
            if (detail) {
                dispatch({
                    type: SET_REASSIGNORDER_DETAIL,
                    payload: response.data,
                });
            } else {
                dispatch({
                    type: SET_REASSIGNORDERS,
                    payload: response.data,
                });
            }
            if (loading) {
                loading();
            }
        });
    };
}

export function reassignOrder(data, callback) {
    return () => axios({
        method: 'post',
        url: urls.reassignOrder,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback();
        } else {
            throw new SubmissionError({
                email: 'error',
                _error: response.data,
            });
        }
    });
}

export function getOrderDetail(id) {
    console.log("ORDER REASSIGN ACTION GET DETAIL");
    return (dispatch) => {
        axios({
            method: 'get',
            url: urls.GetOrderDetail({ id }),
        }).then((response) => {
            dispatch({
                type: SET_REASSIGNORDER_DETAIL,
                payload: response.data,
            });
        });
    };
}

export function unmounOrders() {
    return (dispatch) => {
        dispatch({
            type: UNMOUNT_REASSIGNORDERS,
        });
    };
}