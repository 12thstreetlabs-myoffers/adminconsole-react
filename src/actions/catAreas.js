import axios from 'util/requestInstance';
import urls from 'config/urls';
import { SET_CATAREAS, UNMOUNT_CATAREAS, SET_CATAREAS_DETAIL } from 'constants/catAreas';
import { SubmissionError } from 'redux-form';

export function getCatAreas(data, detail, loading) {
    console.log("Inside getCatAreas");
    return (dispatch) => {
        axios({
            method: 'post',
            url: urls.getCategoryAreas,
            data,
        }).then((response) => {
            if (detail) {
                dispatch({
                    type: SET_CATAREAS_DETAIL,
                    payload: response.data,
                });
            } else {
                dispatch({
                    type: SET_CATAREAS,
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
        url: urls.updateCatAreas,
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

export function getCatAreasDetail(id) {
    console.log("Inside  Areas Details Action"+id);
    return (dispatch) => {
        if (!id) {
            return { data: {} };
        }
        axios({
            method: 'get',
            url: urls.getCatAreasDetail({ id }),
        }).then((response) => {
            dispatch({
                type: SET_CATAREAS_DETAIL,
                payload: response.data,
            });
        });
    };
}
export function submitCreateCatAreas(data, callback, loading) {
    return () => axios({
        method: 'post',
        url: urls.createCatAreas,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback(response.data.data.CatAreaId);
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

export function deleteCatAreas(data, callback) {
    return () => axios({
        method: 'delete',
        url: urls.deleteCatAreas,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback();
        }
    });
}
export function unmountCatAreas() {
    return (dispatch) => {
        dispatch({
            type: UNMOUNT_CATAREAS,
        });
    };
}