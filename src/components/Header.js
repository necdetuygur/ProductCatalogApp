import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
  getCategories,
  getProducts,
  setCategory,
  getBrands,
  getColors,
  getUseCases,
  getMySentOffers,
} from "../actions";
import { useNavigate } from "react-router";
import HeaderButtons from "./HeaderButtons";
import Loading from "../assets/loading.gif";

function Header(props) {
  let navigate = useNavigate();
  useEffect(() => {
    props.getCategories();
    props.getProducts();
    props.getBrands();
    props.getColors();
    props.getUseCases();
    props.getMySentOffers();
    // eslint-disable-next-line
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white mb-2">
      <div className="container-fluid">
        <span
          className="navbar-brand cp"
          onClick={() => {
            navigate("/");
            props.setCategory("");
          }}
        >
          {props.language.appName}
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {props.categories && props.categories.length > 0 ? (
              props.categories.map((category) => (
                <li className="nav-item" key={category.id}>
                  <span
                    className={
                      "cp nav-link " +
                      (props.selectedCategory === category.slug
                        ? "active text-decoration-underline"
                        : "")
                    }
                    aria-current="page"
                    onClick={() => {
                      navigate("/" + category.slug);
                      props.setCategory(category.slug);
                    }}
                  >
                    {category.name}
                  </span>
                </li>
              ))
            ) : (
              <img
                src={Loading}
                alt="..."
                style={{
                  margin: "0 0 0 25px",
                  width: "25px",
                }}
              />
            )}
          </ul>
        </div>
        <div className="d-flex">
          <HeaderButtons />
        </div>
      </div>
    </nav>
  );
}

export default connect(
  (state) => ({
    language: state.language,
    categories: state.categories,
    products: state.products,
    selectedCategory: state.selectedCategory,
  }),
  {
    getCategories,
    getProducts,
    setCategory,
    getBrands,
    getColors,
    getUseCases,
    getMySentOffers,
  }
)(Header);
