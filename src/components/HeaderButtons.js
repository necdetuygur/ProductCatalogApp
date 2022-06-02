import React from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { logout } from "../actions";

function HeaderButtons(props) {
  let navigate = useNavigate();
  return (
    <>
      {props.token && (
        <button
          className="btn btn-warning btn-sm ms-1"
          onClick={() => {
            navigate("/add-product");
          }}
        >
          {props.language.addProduct}
        </button>
      )}

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
        <button
          className="btn btn-danger btn-sm ms-1"
          onClick={() => {
            props.logout();
            navigate("/login");
          }}
        >
          {props.language.logout}
        </button>
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
