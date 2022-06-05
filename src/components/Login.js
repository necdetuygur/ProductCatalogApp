import React from "react";
import { connect } from "react-redux";
import { login } from "../actions";
import { useNavigate } from "react-router";

function Login(props) {
  let navigate = useNavigate();
  const [user, setUser] = React.useState({});
  const [mailErr, setMailErr] = React.useState(false);
  const [passwordErr, setPasswordErr] = React.useState("");

  React.useEffect(() => {
    props.token && navigate("/");
  });

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email) && email.length > 8;
  }
  function validatePassword() {
    if (!!user.password && user.password.length < 8) {
      setPasswordErr(props.language.ERR_PASSWORD_SHORT);
      return false;
    } else if (user.password.length > 19) {
      setPasswordErr(props.language.ERR_PASSWORD_LONG);
      return false;
    }
    setPasswordErr("");
    return true;
  }

  function doLogin() {
    validateEmail(user.email) && validatePassword() && props.login(user);
  }

  return (
    <div className="row justify-content-center align-middle">
      <div className="col-xl-4">
        <div className="card mt-5">
          <div className="card-header">{props.language.login}</div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text">{props.language.email}</span>
              <input
                type="text"
                className="form-control"
                placeholder={props.language.email}
                onChange={(e) => {
                  setMailErr(!validateEmail(e.target.value));
                  setUser({ ...user, email: e.target.value });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    doLogin();
                  }
                }}
              />
            </div>
            {mailErr && (
              <div className="alert alert-danger mb-3">
                {props.language.ERR_EMAILINVALID}
              </div>
            )}
            <div className="input-group mb-3">
              <span className="input-group-text">
                {props.language.password}
              </span>
              <input
                type="password"
                className="form-control"
                placeholder={props.language.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                  validatePassword();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    doLogin();
                  }
                }}
              />
            </div>
            {passwordErr && (
              <div className="alert alert-danger mb-3">{passwordErr}</div>
            )}
          </div>
          <div className="card-footer text-end">
            <button
              className="btn btn-primary"
              onClick={() => {
                doLogin();
              }}
            >
              {props.language.login}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    language: state.language,
    token: state.token,
  }),
  {
    login,
  }
)(Login);
