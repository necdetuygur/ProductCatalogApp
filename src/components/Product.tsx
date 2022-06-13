import React from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import config from "../config";

function Product(props: any) {
  let navigate = useNavigate();

  return (
    <div
      className="col-md-3 mb-3 cp"
      onClick={() => {
        navigate("/product/" + props.product.id);
      }}
    >
      <div className="card bg-light">
        <img
          style={{ minWidth: "100%", height: "150px", objectFit: "contain" }}
          className="card-img-top"
          src={config.PICTURE_BASE + "/" + props.product.picture}
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title cut-text">{props.product.name}</h5>
          <div className="card-text cut-text">{props.product.description}</div>
        </div>
        <div className="card-footer">
          <span className="align-bottom">
            {props.product.price}
            {props.language.priceSign}
          </span>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state: any) => ({
    language: state.language.language,
  }),
  {}
)(Product);
