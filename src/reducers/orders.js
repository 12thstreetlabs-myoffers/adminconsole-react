import { SET_ORDERS, UNMOUNT_ORDERS, SET_ORDER_DETAIL } from 'constants/orders';


const initialState = {
    orderList: {
        data: [],
        total: 0,
        fetching: false,
    },
    orderDetail: {
        data: {},
        fetching: false,
    },
};

export default function orders(state = initialState, action) {
    switch (action.type) {
    case SET_ORDERS:
        return {
            ...state,
            orderList: {
                ...state.orderList,
                data: action.payload.OrderList,
                total: action.payload.TotalOrders,
                fetching: true,
            },
        };
        case SET_ORDER_DETAIL:
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
    case UNMOUNT_ORDERS:
        return initialState;
    default:
        return state;
    }
}
