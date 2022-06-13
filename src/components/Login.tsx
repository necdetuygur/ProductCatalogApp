import React from "react";
import { connect } from "react-redux";
import { login } from "../actions";
import { useNavigate } from "react-router";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import Success from "./Success";

function Login(props: any) {
  let navigate = useNavigate();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [mailErr, setMailErr] = React.useState(false);
  const [passwordErr, setPasswordErr] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      props.token && navigate("/");
    }, 1500);
  });

  function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email) && email.length > 8;
  }
  function validatePassword() {
    if ((!!user.password && user.password.length < 8) || !user.password) {
      setPasswordErr(props.language.ERR_PASSWORD_SHORT);
      return false;
    } else if (!!user.password && user.password.length > 20) {
      setPasswordErr(props.language.ERR_PASSWORD_LONG);
      return false;
    }
    setPasswordErr("");
    return true;
  }

  function doLogin() {
    setLoading(true);
    setMailErr(!validateEmail(user.email));
    validatePassword();
    validateEmail(user.email) && validatePassword() && props.login(user);
    setTimeout(() => {
      setLoading(false);
    }, 2e3);
  }

  return (
    <div className="row justify-content-center align-middle">
      <div className="col-xl-4">
        <div className="card mt-5">
          <div className="card-header">{props.language.login}</div>
          <div className="card-body">
            {props.token && <Success text={props.language.loginSuccess} />}
            {loading && !props.token ? (
              <Loading />
            ) : (
              !props.token && (
                <>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
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
                      value={user.email}
                    />
                  </div>
                  {mailErr && (
                    <div className="alert alert-danger mb-3">
                      {props.language.ERR_EMAILINVALID}
                    </div>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faKey} />
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
                      value={user.password}
                    />
                  </div>
                  {passwordErr && (
                    <div className="alert alert-danger mb-3">{passwordErr}</div>
                  )}
                  {props.loginError === 404 && (
                    <div className="alert alert-danger p-2 mb-1" role="alert">
                      {props.language.ERR_LOGIN}
                    </div>
                  )}
                </>
              )
            )}
          </div>
          <div className="card-footer text-end">
            {!loading && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  doLogin();
                }}
              >
                <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                {props.language.login}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state: any) => ({
    language: state.language.language,
    token: state.user.token,
    loginError: state.user.loginError,
  }),
  {
    login,
  }
)(Login);
