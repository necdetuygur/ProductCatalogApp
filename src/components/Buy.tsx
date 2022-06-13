import React from "react";
import { useNavigate } from "react-router";
import Loading from "./Loading";
import { connect } from "react-redux";
import { buyProduct, buyOrder } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

function Buy(props: any) {
  const [started, setStarted] = React.useState(false);
  let navigate = useNavigate();
  function buyStart() {
    setStarted(true);
    setTimeout(() => {
      const modalCloseBtn = document.querySelector(".btn-close") as HTMLElement;
      if (modalCloseBtn != null) {
        modalCloseBtn.click();
      }
      navigate("/sale-ok");
    }, 1e3);
    if (props.isProductBuy) {
      props.buyProduct(props.product);
    } else {
      props.buyOrder(props.orderId, props.productId);
    }
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
          <FontAwesomeIcon icon={faWallet} className="me-2" />
          {props.language.makeBuy}
        </button>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default connect(
  (state: any) => ({
    language: state.language.language,
  }),
  { buyProduct, buyOrder }
)(Buy);
