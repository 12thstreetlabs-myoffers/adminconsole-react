import axios from 'util/requestInstance';
import urls from 'config/urls';
import { SET_REVIEWS, UNMOUNT_REVIEWS } from 'constants/reviews';

export function getReviews(data) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: urls.getReviews,
            data,
        }).then((response) => {
            dispatch({
                type: SET_REVIEWS,
                payload: response.data,
            });
        });
    };
}
export function hideReview(data, callback) {
    return () => axios({
        method: 'post',
        url: urls.hideReview,
        data,
    }).then((response) => {
        if (response.data.status === 'ok') {
            callback();
        }
    });
}

// export function getOrderDetail(id) {
//     return (dispatch) => {
//         axios({
//             method: 'get',
//             url: urls.GetOrderDetail({ id: id }),
//         }).then((response) => {
//             dispatch({
//                 type: SET_ORDER_DETAIL,
//                 payload: response.data,
//             });
//         });
//     };
// }

export function unmounReviews() {
    return (dispatch) => {
        dispatch({
            type: UNMOUNT_REVIEWS,
        });
    };
}