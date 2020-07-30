import axios from 'util/requestInstance';
import urls from 'config/urls';
import { SET_ITEM, UNMOUNT_ITEM, SET_ITEM_DETAIL } from 'constants/items';
import { SubmissionError } from 'redux-form';

export function getItems(data, detail, loading) {
    console.log("******************************Data****************************");
    console.log(data);
    console.log("Detail");
    console.log(detail);
    return (dispatch) => {
        axios({
            method: 'post',
            url: urls.getItems,
            data,
        }).then((response) => {
            console.log("Response");
            console.log(response.data);
            if (detail) {
                dispatch({
                    type: SET_ITEM_DETAIL,
                    payload: response.data,
                });
            } else {
                dispatch({
                    type: SET_ITEM,
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
        url: urls.updateItem,
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

export function getItemDetail(id) {
    console.log("Inside Set Item Details"+id);
    return (dispatch) => {
          if (!id) {
                return { data: {} };
            }
        axios({
            method: 'get',
            url: urls.getItemDetail({ id }),
        }).then((response) => {
            dispatch({
                type: SET_ITEM_DETAIL,
                payload: response.data,
            });
        });
    };
}
export function submitCreateItem(data, callback, loading) {

    return () => axios({
        method: 'post',
        url: urls.createItem,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback(response.data.data.ItemId);
            console.log("Test-------"+response.data.data.ItemId);
            loading();
        } else {
            loading();
            throw new SubmissionError({
                email: 'error',
                _error: response.data.message,
            });
        }
    })
}

export function deleteItem(data, callback) {
    return () => axios({
        method: 'delete',
        url: urls.deleteItem,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback();
        }
    });
}
export function unmountItems() {
    return (dispatch) => {
        dispatch({
            type: UNMOUNT_ITEM,
        });
    };
}