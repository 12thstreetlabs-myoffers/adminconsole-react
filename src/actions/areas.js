import axios from 'util/requestInstance';
import urls from 'config/urls';
import { SET_AREAS, UNMOUNT_AREAS, SET_AREAS_DETAIL } from 'constants/areas';
import { SubmissionError } from 'redux-form';

export function getAreas(data, detail, loading) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: urls.getAreas,
            data,
        }).then((response) => {
            console.log("Response");
            console.log(response.data);
            if (detail) {
                dispatch({
                    type: SET_AREAS_DETAIL,
                    payload: response.data,
                });
            } else {
                dispatch({
                    type: SET_AREAS,
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
        url: urls.updateAreas,
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

export function getAreasDetail(id) {
    console.log("Inside  Areas Details Action"+id);
    return (dispatch) => {
        function getAreas(){
          if (!id) {
                return { data: {} };
            }
            return axios.get(urls.getAreasDetail({ id })); 
        }
        function getCategoryAreas() {
            return axios.post(urls.getCategoryAreas);
        }
        Promise.all([getAreas(), getCategoryAreas()])
        .then(([areas, category]) => {
            dispatch({
                type: SET_AREAS_DETAIL,
                payload: areas.data,
                category: category.data,
            });
        });
   /*     axios({
            method: 'get',
            url: urls.getAreasDetail({ id }),
        }).then((response) => {
            dispatch({
                type: SET_AREAS_DETAIL,
                payload: response.data,
            });
        });
        */
    };
}
export function submitCreateAreas(data, callback, loading) {
    return () => axios({
        method: 'post',
        url: urls.createAreas,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback(response.data.data.AreasId);
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

export function deleteAreas(data, callback) {
    return () => axios({
        method: 'delete',
        url: urls.deleteAreas,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback();
        }
    });
}
export function unmountAreas() {
    return (dispatch) => {
        dispatch({
            type: UNMOUNT_AREAS,
        });
    };
}