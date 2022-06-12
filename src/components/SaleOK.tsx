import React from "react";
import { connect } from "react-redux";

function SaleOK(props: any) {
  return <div className="text-center m-5 p-5">{props.language.saleOk}.</div>;
}

export default connect(
  (state: any) => ({
    language: state.language,
  }),
  {}
)(SaleOK);
