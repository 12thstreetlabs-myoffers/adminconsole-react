import axios from 'axios';

const instance = axios.create({
    validateStatus: (status) => {
        if (status === 401) {
            // push location
        }
        return true;
    },
});
axios.defaults.headers.common.Authorization 
        ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsIm5hbWUiOiJhZG1pbkBnbWFpbC5jb20iLCJ1c2VyUm9sZSI6IlNVUCIsImlhdCI6MTU1OTQ3MDgyNH0.l5fSUITWYazHCl9CfvNxr8J72Uo89WIkgYjAUtvEhcE";
export default instance;