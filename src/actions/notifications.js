import axios from 'util/requestInstance';
import urls from 'config/urls';
import { SET_NOTIFICATIONS, UNMOUNT_NOTIFICATIONS } from 'constants/notifications';

export function getNotifications(data) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: urls.getNotifications,
            data,
        }).then((response) => {
            dispatch({
                type: SET_NOTIFICATIONS,
                payload: response.data,
            });
        });
    };
}
export function deleteNotifications(data, callback) {
    return () => axios({
        method: 'post',
        url: urls.updateNotifications,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback();
        }
    });
}
export function unmountNotifications() {
    return (dispatch) => {
        dispatch({
            type: UNMOUNT_NOTIFICATIONS,
        });
    };
}