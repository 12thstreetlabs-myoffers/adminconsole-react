import { SET_CATEGORY, UNMOUNT_CATEGORY, SET_CATEGORY_DETAIL } from 'constants/categories';


const initialState = {
     categoriesList: {
        data: [],
        total: 0,
        fetching: false,
    },
    categoryDetail: {
        data: {},
        fetching: false,
    },
};

export default function categories(state = initialState, action) {
    switch (action.type) {
    case SET_CATEGORY:
        return {
            ...state,
            categoriesList: {
                ...state.categoriesList,
                data: action.payload.data.categoriesList,
                total: action.payload.data.totalCategories,
                fetching: true,
            },
        };
        case SET_CATEGORY_DETAIL:
        return {
            ...state,
            categoryDetail: {
                ...state.categoryDetail,
                data:action.payload.data,
                fetching: true,
            },
        };
    case UNMOUNT_CATEGORY:
        return initialState;
    default:
        return state;
    }
}
