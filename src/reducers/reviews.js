import { SET_REVIEWS, UNMOUNT_REVIEWS, SET_REVIEW_DETAIL } from 'constants/reviews';


const initialState = {
    reviewList: {
        data: [],
        total: 0,
        fetching: false,
    },
    reviewDetail: {
        data: {},
        fetching: false,
    },
};

export default function reviews(state = initialState, action) {
    switch (action.type) {
    case SET_REVIEWS:
        return {
            ...state,
            reviewList: {
                ...state.reviewList,
                data: action.payload.reviewsList,
                total: action.payload.totalReviews,
                fetching: true,
            },
        };
    case SET_REVIEW_DETAIL:
        return {
            ...state,
            reviewDetail: {
                ...state.reviewDetail,
                data: action.payload.data,
                // usersServiceMap: action.payload.data.usersServiceMap,
                fetching: true,
            },
        };
    case UNMOUNT_REVIEWS:
        return initialState;
    default:
        return state;
    }
}
