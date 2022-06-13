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
  setTheme,
} from "../actions";
import { useNavigate } from "react-router";
import HeaderButtons from "./HeaderButtons";
import Loading from "../assets/loading.svg";

function Header(props: any) {
  let navigate = useNavigate();
  useEffect(() => {
    props.getCategories();
    props.getProducts();
    props.getBrands();
    props.getColors();
    props.getUseCases();
    props.token && props.getMySentOffers();
    props.setTheme(props.theme);
    setTimeout(() => {
      document.getElementsByTagName("body")[0].style.display = "block";
    }, 1e3);
    // eslint-disable-next-line
  }, [props.token]);

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
              props.categories.map((category: any) => (
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
              <>
                <img
                  src={Loading}
                  alt="..."
                  style={{
                    margin: "0 0 0 25px",
                  }}
                />
                <img
                  src={Loading}
                  alt="..."
                  style={{
                    margin: "0 0 0 25px",
                  }}
                />
                <img
                  src={Loading}
                  alt="..."
                  style={{
                    margin: "0 0 0 25px",
                  }}
                />
              </>
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
  (state: any) => ({
    language: state.language.language,
    categories: state.category.categories,
    products: state.product.products,
    selectedCategory: state.category.selectedCategory,
    token: state.user.token,
    theme: state.theme.theme,
  }),
  {
    getCategories,
    getProducts,
    setCategory,
    getBrands,
    getColors,
    getUseCases,
    getMySentOffers,
    setTheme,
  }
)(Header);
