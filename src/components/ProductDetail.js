import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addCart } from "../actions";
import config from "../config";

function ProductDetail(props) {
  let params = useParams();
  let product = props.products.find(
    (product) => product.id + "" === params.productId
  );

  return (
    props.products &&
    props.products.length > 0 && (
      <div className="row mb-2 mt-2 content">
        <div className="col-md-6">
          <img
            style={{ width: "100%" }}
            src={
              config.PICTURE_BASE +
              "/" +
              product.picture +
              "?i=" +
              new Date() * Math.random()
            }
            alt=""
          />
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header">{props.language.productDetail}</div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{product.name}</li>
                <li className="list-group-item">{product.description}</li>
                <li className="list-group-item">{product.price}$</li>
              </ul>
            </div>
            <div className="card-footer">
              <span
                className="btn btn-primary float-end cp"
                onClick={() => {
                  props.addCart(product);
                }}
              >
                {props.language.addToCart}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default connect(
  (state) => ({
    language: state.language,
    products: state.products,
  }),
  { addCart }
)(ProductDetail);
