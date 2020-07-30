import { LOGIN_SUCCESS } from 'constants/login';
const initialState = {
    loginData: {
        token: ""
    }
};
export default function gocredit(state = initialState, action) {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return {
            ...state,
            login: {
                ...state.login,
                //set header
                //redirect to dashboard
                
            },
        };
    default:
        return state;
    }
}