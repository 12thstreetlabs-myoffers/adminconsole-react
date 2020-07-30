import { SET_CUSTOMERS, UNMOUNT_CUSTOMERS, SET_CUSTOMER_DETAIL } from 'constants/customers';


const initialState = {
    customersList: {
        data: [],
        total: 0,
        fetching: false,
    },
    customerDetail: {
        data: {},
        fetching: false,
    },
};

export default function customers(state = initialState, action) {
    switch (action.type) {
    case SET_CUSTOMERS:
    console.log(action.payload);
        return {
            ...state,
            customersList: {
                ...state.customersList,
                data: action.payload.customerList,
                total: action.payload.totalCustomers,
                fetching: true,
            },
        };
    case SET_CUSTOMER_DETAIL: {
        delete action.payload.data.address.isDefault;
        const address = Object.keys(action.payload.data.address).map(i => action.payload.data.address[i]).join(',');
        return {
            ...state,
            customerDetail: {
                ...state.customerDetail,
                data: { ...action.payload.data, address },
                fetching: true,
            },
        };
    }
    case UNMOUNT_CUSTOMERS:
        return initialState;
    default:
        return state;
    }
}
