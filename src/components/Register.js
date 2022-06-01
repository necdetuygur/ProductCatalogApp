import React from "react";
import { connect } from "react-redux";
import { addUser } from "../actions";

function Register(props) {
  const [user, setUser] = React.useState({});
  const [errors, setErrors] = React.useState([]);
  function save() {
    var saveErrors = [];
    if (user.password !== user.passwordAgain) {
      saveErrors.push(props.language.ERR_PASSWORD_NOT_EQUAL);
    }
    if (user.password.length < 8 || user.passwordAgain.length < 8) {
      saveErrors.push(props.language.ERR_PASSWORD_SHORT);
    }
    if (user.password.length > 19 || user.passwordAgain.length > 19) {
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

            <pre>{JSON.stringify(user, 2, 2)}</pre>
            <pre>{JSON.stringify(props.addUserSuccess, 2, 2)}</pre>
            <div className="input-group mb-3">
              <span className="input-group-text">{props.language.name}</span>
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
              <span className="input-group-text">{props.language.surname}</span>
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
              <span className="input-group-text">{props.language.email}</span>
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
  }),
  { addUser }
)(Register);