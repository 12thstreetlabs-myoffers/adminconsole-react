import axios from 'util/requestInstance';
import urls from 'config/urls';
import { SET_LAUNDRIES, UNMOUNT_LAUNDRIES, SET_LAUNDRY_DETAIL } from 'constants/laundries';
import { SubmissionError } from 'redux-form';

export function getLaundries(data) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: urls.getLaundries,
            data,
        }).then((response) => {
            dispatch({
                type: SET_LAUNDRIES,
                payload: response.data.data,
            });
        });
    };
}

export function getLaundryDetail(id) {
    return (dispatch) => {
        function getLaundry() {
            if (!id) {
                return { data: {} };
            }
            return axios.get(urls.getLaundryDetail({ id }));
        }
        function getAreas() {
            return axios.post(urls.getAreas);
        }
        function getCategoriesItems() {
            return axios.get(urls.getCategoriesItems);
        }

        Promise.all([getLaundry(), getCategoriesItems(),getAreas()])
            .then(([laundry, category,areas]) => {
                dispatch({
                    type: SET_LAUNDRY_DETAIL,
                    payload: laundry.data,
                    category: category.data,
                    areas:areas.data
                });
            });
    };
}

export function submitEditLandry(data, callback, loading) {
    console.log("InsideLaundries");
    console.log(data);
    return () => axios({
        method: 'put',
        url: urls.updateLaundry,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback();
        } else {
            loading();
            throw new SubmissionError({
                email: 'error',
                _error: response.data.data,
            });
        }
    });
}

export function submitCreateLaundry(data, callback, loading) {
    return () => axios({
        method: 'post',
        url: urls.createLaundry,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback(response.data.data.providerId);
        } else {
            loading();
            throw new SubmissionError({
                email: 'error',
                _error: response.data.message,
            });
        }
    });
}

export function deleteLaundry(data, callback) {
    return () => axios({
        method: 'delete',
        url: urls.deleteLaundry,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback();
        }
    });
}

export function unmounLaundries() {
    return (dispatch) => {
        dispatch({
            type: UNMOUNT_LAUNDRIES,
        });
    };
}
