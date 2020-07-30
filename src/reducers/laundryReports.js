import { SET_LAUNDRYREPORT, UNMOUNT_LAUNDRYREPORT } from "constants/reports";
import { INITIALIZE } from "redux-form/lib/actionTypes";

const initialState = {
  laundryReport: {
    data: [],
    total: 0,
    fetching: false
  }
};

export default function laundryReports(state = initialState, action) {
  switch (action.type) {
    case SET_LAUNDRYREPORT:
      console.log("Inside Reports Reducers");
      console.log(action.payload);
      return {
        ...state,
        laundryReport: {
          ...state.laundryReport,
          data: action.payload.providerList,
          total: action.payload.totalProviders,
          fetching: true
        }
      };
    case UNMOUNT_LAUNDRYREPORT:
      return initialState;
    default:
      return state;
  }
}
