import React from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import config from "../config";

function Product(props) {
  let navigate = useNavigate();

  return (
    <div className="col-md-3 mb-3 cp">
      <div className="card">
        <img
          className="card-img-top"
          src={
            config.PICTURE_BASE +
            "/" +
            props.product.picture +
            "?i=" +
            new Date() * Math.random()
          }
          alt=""
          onClick={() => {
            navigate("/product/" + props.product.id);
          }}
        />
        <div
          className="card-body"
          onClick={() => {
            navigate("/product/" + props.product.id);
          }}
        >
          <h5 className="card-title">{props.product.name}</h5>
          <div className="card-text">{props.product.description}</div>
        </div>
        <div className="card-footer">
          <span className="align-bottom">{props.product.price}</span>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    language: state.language,
  }),
  {}
)(Product);
