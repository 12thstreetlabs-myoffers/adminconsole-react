import axios from 'util/requestInstance';
import urls from 'config/urls';
import { SET_GOCREDIT, UNMOUNT_GOCREDIT, SET_GOCREDIT_DETAIL } from 'constants/gocredit';
import { SubmissionError } from 'redux-form';

export function getGoCredit(data, detail, loading) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: urls.getGoCredits,
            data,
        }).then((response) => {
            console.log("Response");
            console.log(response.data);
            if (detail) {
                dispatch({
                    type: SET_GOCREDIT_DETAIL,
                    payload: response.data,
                });
            } else {
                dispatch({
                    type: SET_GOCREDIT,
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
    console.log("Inside Submit Edit");
    console.log(data);
    return () => axios({
        method: 'post',
        url: urls.updateGoCredit,
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

export function getGoCreditDetail(id) {
    console.log("Inside  GoCredit Details Action"+id);
    return (dispatch) => {
          if (!id) {
                return { data: {} };
            }
        axios({
            method: 'get',
            url: urls.getGoCreditDetail({ id }),
        }).then((response) => {
            dispatch({
                type: SET_GOCREDIT_DETAIL,
                payload: response.data,
            });
        });
    };
}
export function submitCreateGoCredit(data, callback, loading) {

    return () => axios({
        method: 'post',
        url: urls.createGoCredit,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback(response.data.data.PackageId);
            console.log("Test-------"+response.data.data.PackageId);
            loading();
        } else {
            loading();
            throw new SubmissionError({
                email: 'error',
                _error: response.data.message,
            });
        }
    });
}

export function deleteGoCredit(data, callback) {
    return () => axios({
        method: 'delete',
        url: urls.deleteGoCredit,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback();
        }
    });
}
export function unmountGoCredit() {
    return (dispatch) => {
        dispatch({
            type: UNMOUNT_GOCREDIT,
        });
    };
}