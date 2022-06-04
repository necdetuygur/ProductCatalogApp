import React from "react";
import { connect } from "react-redux";

function Success(props) {
  return (
    <div className="alert alert-success text-center">
      {props.language.success}
    </div>
  );
}

export default connect(
  (state) => ({
    language: state.language,
  }),
  {}
)(Success);
