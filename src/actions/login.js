import axios from 'util/requestInstance';
import urls from 'config/urls';
import { SubmissionError } from 'redux-form';
export function login(data, callback, loading) {
    console.log("Inisde Action"+urls.login);
    console.log(data);
    return () => axios({
        method: 'post',
        url: urls.login,
        data,
    }).then((response) => {
         if (response.data.status === 'ok') {
            console.log(response.headers.Authorization);
            axios.defaults.headers.common.Authorization ='Bearer '+response.headers.authorization;
            console.log(axios.defaults.headers.common.Authorization);
            callback(response.data);
        } else {
            loading();
            throw new SubmissionError({
                email: 'error',
                _error: response.data.message,
            });
        }
    });
}