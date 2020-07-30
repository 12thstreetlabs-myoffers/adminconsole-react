import axios from 'util/requestInstance';
import urls from 'config/urls';
import { SET_CATEGORY, UNMOUNT_CATEGORY, SET_CATEGORY_DETAIL } from 'constants/categories';
import { SubmissionError } from 'redux-form';

export function getCategories(data, detail, loading) {
    console.log("******************************Data****************************");
    console.log(data);
    console.log("Detail");
    console.log(detail);
    return (dispatch) => {
        axios({
            method: 'post',
            url: urls.getCategories,
            data,
        }).then((response) => {
            console.log("Response");
            console.log(response.data);
            if (detail) {
                dispatch({
                    type: SET_CATEGORY_DETAIL,
                    payload: response.data,
                });
            } else {
                dispatch({
                    type: SET_CATEGORY,
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
        url: urls.updateCategory,
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

export function getCategoryDetail(id) {
    console.log("Inside Set Category Details"+id);
    return (dispatch) => {
          if (!id) {
                return { data: {} };
            }
        axios({
            method: 'get',
            url: urls.getCategoryDetail({ id }),
        }).then((response) => {
            dispatch({
                type: SET_CATEGORY_DETAIL,
                payload: response.data,
            });
        });
    };
}
export function submitCreateCategory(data, callback, loading) {

    return () => axios({
        method: 'post',
        url: urls.createCategory,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback(response.data.data.CatId);
            console.log("Test-------"+response.data.data.CatId);
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

export function deleteCategory(data, callback) {
    return () => axios({
        method: 'delete',
        url: urls.deleteCategory,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback();
        }
    });
}
export function unmountCategories() {
    return (dispatch) => {
        dispatch({
            type: UNMOUNT_CATEGORY,
        });
    };
}