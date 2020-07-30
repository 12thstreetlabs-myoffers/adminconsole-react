import { SET_CATAREAS, UNMOUNT_CATAREAS, SET_CATAREAS_DETAIL } from 'constants/catAreas';


const initialState = {
    catAreasList: {
        data: [],
        total: 0,
        fetching: false,
    },
    catAreasDetail: {
        data: {},
        fetching: false,
    },
};

export default function catAreas(state = initialState, action) {
    switch (action.type) {
    case SET_CATAREAS:
    console.log("INisde SET_CATAREAS");
    console.log(action.payload.data.catAreasList);
        return {
            ...state,
            catAreasList: {
                ...state.catAreasList,
                data: action.payload.data.catAreasList,
                total: action.payload.data.totalAreasCount,
                fetching: true,
            },
        };
        case SET_CATAREAS_DETAIL:
        console.log("INSIDE REDUCER AREAS CATEGORY DATA*****");
        console.log(action.payload.data);
        return {
            ...state,
            catAreasDetail: {
                ...state.catAreasDetail,
                data:action.payload.data,
                fetching: true,
            },
        };
    case UNMOUNT_CATAREAS:
        return initialState;
    default:
        return state;
    }
}
