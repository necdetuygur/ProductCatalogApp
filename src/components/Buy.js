import React from "react";
import { useNavigate } from "react-router";
import Loading from "./Loading";
import { connect } from "react-redux";
import { buyProduct } from "../actions";

function Buy(props) {
  const [started, setStarted] = React.useState(false);
  let navigate = useNavigate();
  function buyStart() {
    setStarted(true);
    setTimeout(() => {
      navigate("/sale-ok");
    }, 3e3);
    props.buyProduct(props.product);
  }
  return (
    <div className="text-center m-5 p-5">
      {!started ? (
        <button
          className="btn btn-primary w-100"
          onClick={() => {
            buyStart();
          }}
        >
          {props.language.makeBuy}
        </button>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default connect(
  (state) => ({
    language: state.language,
  }),
  { buyProduct }
)(Buy);
