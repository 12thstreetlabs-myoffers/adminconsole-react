import axios from 'util/requestInstance';
import urls from 'config/urls';
import { SET_LAUNDRYREPORT, UNMOUNT_LAUNDRYREPORT,SET_USERREPORT,UNMOUNT_USERREPORT } from 'constants/reports';
export function getLaundryReport(data) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: urls.getProviderRevenueReport,
            data,
        }).then((response) => {
            dispatch({
                type: SET_LAUNDRYREPORT,
                payload: response.data.data,
            });
        });
    };
}

export function unmountLaundryReport() {
    return (dispatch) => {
        dispatch({
            type: UNMOUNT_LAUNDRYREPORT,
        });
    };
}

    export function getUserReport(data) {
        return (dispatch) => {
            axios({
                method: 'post',
                url: urls.getUserRevenueReport,
                data,
            }).then((response) => {
                dispatch({
                    type: SET_USERREPORT,
                    payload: response.data.data,
                });
            });
        };
    }
    
    export function unmountUserReport() {
        return (dispatch) => {
            dispatch({
                type: UNMOUNT_USERREPORT,
            });
        };
}