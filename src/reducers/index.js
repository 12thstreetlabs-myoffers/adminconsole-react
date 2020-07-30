import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import orders from './orders';
import laundries from './laundries';
import customers from './customers';
import reviews from './reviews';
import categories from './categories';
import items from './items';
import gocredit from './gocredit';
import login from './login';
import laundryReports from './laundryReports';
import userReports from './userReports';
import notifications from './notifications';
import orderReassign from './orderReassign';
import areas from './areas';
import catAreas from './catAreas';
export default combineReducers({
    login,
    orders,
    laundries,
    customers,
    reviews,
    categories,
    items,
    gocredit,
    form: formReducer,
    laundryReports,
    userReports,
    notifications,
    orderReassign,
    areas,
    catAreas
});