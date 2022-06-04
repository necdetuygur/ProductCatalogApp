import React from "react";
import { connect } from "react-redux";

function SaleOK(props) {
  return <div className="text-center m-5 p-5">{props.language.saleOk}.</div>;
}

export default connect(
  (state) => ({
    language: state.language,
  }),
  {}
)(SaleOK);
