import axios from "axios";

const instance = axios.create({
  validateStatus: (status) => {
    if (status === 401) {
      // push location
    }
    return true;
  },
});

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.defaults.headers.common.Authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJhZG1pbiIsIngtaGFzdXJhLXVzZXItaWQiOiIxIiwieC1oYXN1cmEtb3JnLWlkIjoiMTIzIiwieC1oYXN1cmEtY3VzdG9tIjoiY3VzdG9tLXZhbHVlIn0sImlhdCI6MTU5Mzk2ODA4N30.Wyl0khmTXhhEJM-Qvlq6FLFSLBbYLAS1Telp_bzS1ZA";
export default instance;
