import { SET_NOTIFICATIONS, UNMOUNT_NOTIFICATIONS } from 'constants/notifications';


const initialState = {
     notificationsList: {
        data: [],
        total: 0,
        fetching: false,
    }
};

export default function notifications(state = initialState, action) {
    switch (action.type) {
    case SET_NOTIFICATIONS:
        return {
            ...state,
            notificationsList: {
                ...state.notificationsList,
                data: action.payload.data.notificationList,
                total: action.payload.data.totalNotifcations,
                fetching: true,
            },
        };
    case UNMOUNT_NOTIFICATIONS:
        return initialState;
    default:
        return state;
    }
}
