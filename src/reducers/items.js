import { SET_ITEM, UNMOUNT_ITEM, SET_ITEM_DETAIL } from 'constants/items';


const initialState = {
     itemsList: {
        data: [],
        total: 0,
        fetching: false,
    },
    itemDetail: {
        data: {},
        fetching: false,
    },
};

export default function items(state = initialState, action) {
    switch (action.type) {
    case SET_ITEM:
        return {
            ...state,
            itemsList: {
                ...state.itemList,
                data: action.payload.data.itemsList,
                total: action.payload.data.totalItems,
                fetching: true,
            },
        };
        case SET_ITEM_DETAIL:
        return {
            ...state,
            itemDetail: {
                ...state.itemDetail,
                data:action.payload.data,
                fetching: true,
            },
        };
    case UNMOUNT_ITEM:
        return initialState;
    default:
        return state;
    }
}
