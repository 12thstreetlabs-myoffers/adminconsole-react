import axios from "util/requestInstance";
import urls from "config/urls";
import { SubmissionError } from "redux-form";

const query = `
          mutation($name: String!, $password: String!) {
              userLogin(name: $name, password: $password) {
                data
                status
              }
            }
          `;

export function login(formdata, callback, loading) {
  let name = formdata.userName;
  let password = formdata.password;

  return () =>
    axios({
      method: "post",
      url: urls.graphql,
      data: {
        query: query,
        variables: { name, password },
      },
    }).then((response) => {
      let res = response.data;

      if (res.data.userLogin.status === "ok") {
        //console.log(response.headers.Authorization);
        debugger;
        axios.defaults.headers.common.Authorization =
          "Bearer " + res.data.userLogin.data.accessToken;
        //console.log(axios.defaults.headers.common.Authorization);
        callback(res);
      } else {
        loading();
        throw new SubmissionError({
          email: "error",
          _error: res.message,
        });
      }
    });
}
