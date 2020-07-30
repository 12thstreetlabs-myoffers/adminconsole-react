import { SET_LAUNDRIES, UNMOUNT_LAUNDRIES, SET_LAUNDRY_DETAIL } from 'constants/laundries';


const initialState = {
    laundriesList: {
        data: [],
        total: 0,
        fetching: false,
    },
    laundryDetail: {
        data: {},
        category: [],
        fetching: false,
    },
};

export default function laundries(state = initialState, action) {
    switch (action.type) {
    case SET_LAUNDRIES:
        return {
            ...state,
            laundriesList: {
                ...state.laundriesList,
                data: action.payload.ProviderList,
                total: action.payload.TotalProviders,
                fetching: true,
            },
        };
    case SET_LAUNDRY_DETAIL:
        let itemList = [];
        if (action.payload.data) {
            itemList = action.payload.data.itemList.map(i => ({
                ...i,
                itemId: i.ItemId,
                price: String(i.Price),
                serviceType: i.ServiceType,
            }));
        }
        let areaList = [];
        console.log(action.areas.data)
        if (action.areas.data) {
            areaList = action.areas.data.map(i => ({
                ...i,
                area: i.Area
            }));
        }
        return {
            ...state,
            laundryDetail: {
                ...state.laundryDetail,
                data: {
                    ...action.payload.data,
                    itemList,
                },
                category: action.category.data,
                areas:areaList,
                fetching: true,
            },
        };
    case UNMOUNT_LAUNDRIES:
        return initialState;
    default:
        return state;
    }
}
