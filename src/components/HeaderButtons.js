import React from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { logout } from "../actions";

function HeaderButtons(props) {
  let navigate = useNavigate();
  return (
    <>
      {!props.token && (
        <>
          <button
            className="btn btn-primary btn-sm ms-1"
            onClick={() => {
              navigate("/login");
            }}
          >
            {props.language.login}
          </button>
          <button
            className="btn btn-primary btn-sm ms-1"
            onClick={() => {
              navigate("/register");
            }}
          >
            {props.language.register}
          </button>
        </>
      )}

      {props.token && (
        <>
          <button
            className="btn btn-primary btn-sm ms-1"
            onClick={() => {
              navigate("/add-product");
            }}
          >
            {props.language.addProduct}
          </button>
          <div className="btn-group ms-1">
            <button
              className="btn btn-primary btn-sm"
              type="button"
              onClick={() => {
                navigate("/my-account");
              }}
            >
              {props.language.myAccount}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <span
                  className="dropdown-item cp"
                  onClick={() => {
                    props.logout();
                    navigate("/login");
                  }}
                >
                  {props.language.logout}
                </span>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default connect(
  (state) => ({
    token: state.token,
    language: state.language,
  }),
  {
    logout,
  }
)(HeaderButtons);
