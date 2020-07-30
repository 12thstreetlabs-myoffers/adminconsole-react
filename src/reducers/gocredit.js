import { SET_GOCREDIT, UNMOUNT_GOCREDIT, SET_GOCREDIT_DETAIL } from 'constants/gocredit';


const initialState = {
    goCreditList: {
        data: [],
        total: 0,
        fetching: false,
    },
    goCreditDetail: {
        data: {},
        fetching: false,
    },
};

export default function gocredit(state = initialState, action) {
    switch (action.type) {
    case SET_GOCREDIT:
        return {
            ...state,
            goCreditList: {
                ...state.goCreditList,
                data: action.payload.data.gcList,
                total: action.payload.data.totalGCCount,
                fetching: true,
            },
        };
        case SET_GOCREDIT_DETAIL:
        return {
            ...state,
            goCreditDetail: {
                ...state.goCreditDetail,
                data:action.payload.data,
                fetching: true,
            },
        };
    case UNMOUNT_GOCREDIT:
        return initialState;
    default:
        return state;
    }
}
