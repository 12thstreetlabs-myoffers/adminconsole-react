import { SET_REASSIGNORDERS, UNMOUNT_REASSIGNORDERS, SET_REASSIGNORDER_DETAIL } from 'constants/orderReassign';


const initialState = {
    orderList: {
        data: [],
        providerList:[],
        total: 0,
        fetching: false,
    },
    orderDetail: {
        data: {},
        fetching: false,
    },
};

export default function orderReassign(state = initialState, action) {
    switch (action.type) {
    case SET_REASSIGNORDERS:
        console.log("INSIDE ORDER REASSIGN");
        console.log(action.payload);
        return {
            ...state,
            orderList: {
                ...state.orderList,
                data: action.payload.data.OrderList,
                providerList: action.payload.data.ProviderList,
                total: action.payload.data.TotalOrders,
                fetching: true,
            },
        };
        case SET_REASSIGNORDER_DETAIL:
        console.log("INSIDE REDUCER ORDER DETAIL");
        console.log( action.payload);
        const items = action.payload.data.orderServiceMap.map((item) => {
            return {...item[1][0],
                count: item[1][0].Count,
                price: item[1][0].Price,
                orderId: item[1][0].OrderId,
                serviceType: item[1][0].ServiceType,
                items: String(item[1][0].Items),
                item: String(item[1][0].ItemId),
            };
        });
        const data = {
            ...action.payload.data.orderInfo,
            orderId: action.payload.data.orderInfo.OrderId,
            ItemList: items,
        };
        return {
            ...state,
            orderDetail: {
                ...state.orderDetail,
                data,
                orderServiceMap: action.payload.data.orderServiceMap,
                fetching: true,
            },
        };
    case UNMOUNT_REASSIGNORDERS:
        return initialState;
    default:
        return state;
    }
}
