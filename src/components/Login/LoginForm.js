import React from "react";
import { Field, reduxForm } from "redux-form";
function LoginForm(props) {
  const { handleSubmit, pristine, submitting, onSubmit, error } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="order-detail-form">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="form-row">
        <div className="col mb-3">
          <label htmlFor="UserName<">Phone</label>
          <Field
            className="form-control"
            id="userName"
            placeholder="User Name"
            name="userName"
            component="input"
          />
        </div>
        <div className="col mb-3">
          <label htmlFor="Password">Passwords</label>
          <Field
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            component="input"
          />
        </div>
      </div>
      <button
        className="btn btn-primary submit"
        type="submit"
        disabled={pristine || submitting}
      >
        Login
      </button>
    </form>
  );
}
export default reduxForm({ form: "LoginForm" })(LoginForm);
