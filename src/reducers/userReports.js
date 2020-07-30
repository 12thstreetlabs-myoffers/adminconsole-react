import { SET_USERREPORT, UNMOUNT_USERREPORT } from "constants/reports";

const initialState = {
  userReport: {
    data: [],
    total: 0,
    fetching: false
  }
};

export default function userReports(state = initialState, action) {
  switch (action.type) {
    case SET_USERREPORT:
      return {
        ...state,
        userReport: {
          ...state.userReport,
          data: action.payload.customerList,
          total: action.payload.totalCustomer,
          fetching: true
        }
      };
    case UNMOUNT_USERREPORT:
      return initialState;

    default:
      return state;
  }
}
