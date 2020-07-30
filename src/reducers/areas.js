import { SET_AREAS, UNMOUNT_AREAS, SET_AREAS_DETAIL } from 'constants/areas';


const initialState = {
    areasList: {
        data: [],
        total: 0,
        fetching: false,
    },
    areasDetail: {
        data: {},
        fetching: false,
    },
};

export default function areas(state = initialState, action) {
    switch (action.type) {
    case SET_AREAS:
        return {
            ...state,
            areasList: {
                ...state.areasList,
                data: action.payload.data.areasList,
                total: action.payload.data.totalAreasCount,
                fetching: true,
            },
        };
        case SET_AREAS_DETAIL:
        console.log("INSIDE REDUCER AREAS CATEGORY DATA*****");
        console.log(action.category.data);
        console.log(action.payload.data);
        return {
            ...state,
            areasDetail: {
                ...state.areasDetail,
                data:action.payload.data,
                categoryList: action.category.data,
                fetching: true,
            },
        };
    case UNMOUNT_AREAS:
        return initialState;
    default:
        return state;
    }
}
