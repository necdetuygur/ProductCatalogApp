import React from "react";
import { connect } from "react-redux";
import { addUser, login } from "../actions";
import { useNavigate } from "react-router";
import Success from "./Success";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email) && email.length > 8;
}

function Register(props: any) {
  let navigate = useNavigate();
  const [user, setUser] = React.useState({
    name: "",
    surname: "",
    password: "",
    passwordAgain: "",
    email: "",
  });
  const [errors, setErrors] = React.useState([] as any);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    props.token && navigate("/");
    if (!props.addUserError.success) {
      var er = [props.language.ERR_EMAIL_EXISTS];
      setErrors(er);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [props.addUserError.success, props.token]);

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
    } else if (user.password.length < 8 || user.passwordAgain.length < 8) {
      saveErrors.push(props.language.ERR_PASSWORD_SHORT);
    } else if (user.password.length > 20 || user.passwordAgain.length > 20) {
      saveErrors.push(props.language.ERR_PASSWORD_LONG);
    }

    // Name
    if (user.name.length < 1) {
      saveErrors.push(props.language.ERR_NAME_SHORT);
    }

    // Surname
    if (user.surname.length < 1) {
      saveErrors.push(props.language.ERR_SURNAME_SHORT);
    }

    setErrors(saveErrors);
    if (saveErrors.length > 0) {
      setLoading(false);
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
              errors.map((error: any) => (
                <div
                  key={error}
                  className="alert alert-danger p-2 mb-3"
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        save();
                      }
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        save();
                      }
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        save();
                      }
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        save();
                      }
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        save();
                      }
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
              <FontAwesomeIcon icon={faSave} className="me-2" />
              {props.language.register}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state: any) => ({
    language: state.language.language,
    addUserSuccess: state.user.addUserSuccess,
    token: state.user.token,
    addUserError: state.user.addUserError,
  }),
  { addUser, login }
)(Register);
