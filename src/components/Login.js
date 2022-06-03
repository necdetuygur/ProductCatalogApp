import React from "react";
import { connect } from "react-redux";
import { login } from "../actions";
import { useNavigate } from "react-router";

function Login(props) {
  let navigate = useNavigate();
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    props.token && navigate("/");
  });

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
                  setUser({ ...user, email: e.target.value });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    props.login(user);
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
                    props.login(user);
                  }
                }}
              />
            </div>
          </div>
          <div className="card-footer text-end">
            <button
              className="btn btn-primary"
              onClick={() => {
                props.login(user);
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
