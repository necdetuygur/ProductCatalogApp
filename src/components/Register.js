import React from "react";
import { connect } from "react-redux";
import { addUser, login } from "../actions";
import { useNavigate } from "react-router";
import Success from "./Success";
import Loading from "./Loading";

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email) && email.length > 8;
}

function Register(props) {
  let navigate = useNavigate();
  const [user, setUser] = React.useState({});
  const [errors, setErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    props.token && navigate("/");
  });
  function save() {
    setLoading(true);
    var saveErrors = [];

    // E-Mail
    if (!validateEmail(user.email)) {
      saveErrors.push(props.language.ERR_EMAILINVALID);
    }

    // Passwords
    if (user.password !== user.passwordAgain) {
      saveErrors.push(props.language.ERR_PASSWORD_NOT_EQUAL);
    } else if (
      (!!user.password && user.password.length < 8) ||
      (!!user.passwordAgain && user.passwordAgain.length < 8)
    ) {
      saveErrors.push(props.language.ERR_PASSWORD_SHORT);
    } else if (user.password.length > 19 || user.passwordAgain.length > 19) {
      saveErrors.push(props.language.ERR_PASSWORD_LONG);
    }
    setErrors(saveErrors);
    if (saveErrors.length > 0) {
      return;
    }
    props.addUser(user);
  }

  return (
    <div className="row justify-content-center align-middle">
      <div className="col-xl-4">
        <div className="card mt-5">
          <div className="card-header">{props.language.register}</div>
          <div className="card-body">
            {errors.length > 0 &&
              errors.map((error) => (
                <div
                  key={error}
                  className="alert alert-danger p-2 my-2"
                  role="alert"
                >
                  {error}
                </div>
              ))}

            {props.addUserSuccess.success &&
              (function () {
                setTimeout(() => {
                  props.login({
                    email: user.email,
                    password: user.password,
                  });
                }, 2e3);
                return true;
              })() && <Success />}

            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    {props.language.name}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={props.language.name}
                    onChange={(e) => {
                      setUser({ ...user, name: e.target.value });
                    }}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    {props.language.surname}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={props.language.surname}
                    onChange={(e) => {
                      setUser({ ...user, surname: e.target.value });
                    }}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    {props.language.email}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={props.language.email}
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                  />
                </div>
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
                    }}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    {props.language.passwordAgain}
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder={props.language.passwordAgain}
                    onChange={(e) => {
                      setUser({ ...user, passwordAgain: e.target.value });
                    }}
                  />
                </div>
              </>
            )}
          </div>
          <div className="card-footer text-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                save();
              }}
            >
              {props.language.register}
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
    addUserSuccess: state.addUserSuccess,
    token: state.token,
  }),
  { addUser, login }
)(Register);
