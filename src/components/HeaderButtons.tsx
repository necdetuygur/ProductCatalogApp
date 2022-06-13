import React from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { logout } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faPlus,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function HeaderButtons(props: any) {
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
            <FontAwesomeIcon icon={faUser} className="me-2" />
            {props.language.login}
          </button>
          <button
            className="btn btn-primary btn-sm ms-1"
            onClick={() => {
              navigate("/register");
            }}
          >
            <FontAwesomeIcon icon={faUsers} className="me-2" />
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
            <FontAwesomeIcon icon={faPlus} className="me-2" />
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
              <FontAwesomeIcon icon={faUser} className="me-2" />
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
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <span
                  className="dropdown-item cp"
                  onClick={() => {
                    navigate("/my-account");
                  }}
                >
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  {localStorage.getItem("name") +
                    " " +
                    localStorage.getItem("surname")}
                </span>
              </li>

              <li>
                <span
                  className="dropdown-item cp"
                  onClick={() => {
                    props.logout();
                    navigate("/login");
                  }}
                >
                  <FontAwesomeIcon icon={faDoorOpen} className="me-2" />
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
  (state: any) => ({
    token: state.user.token,
    language: state.language.language,
  }),
  {
    logout,
  }
)(HeaderButtons);
