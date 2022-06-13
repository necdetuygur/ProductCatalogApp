import React from "react";
import { connect } from "react-redux";
import { addOrder } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function SendOffer(props: any) {
  const [price, setPrice] = React.useState(0);
  const [order, setOrder] = React.useState({
    userId: localStorage.getItem("userId"),
    productId: props.product.id,
    statusId: 1,
    price: 0,
  });

  function calculate(percent: number) {
    var ret = (props.product.price * percent) / 100;
    setPrice(ret);
    return ret;
  }

  return (
    <>
      <div className="input-group mb-2">
        <span className="input-group-text">{props.language.quickOffers}</span>
        <select
          className="form-select form-select-sm"
          defaultValue={"DEFAULT"}
          onChange={(e) => {
            setOrder({
              ...order,
              price: calculate(parseFloat(e.target.value)),
            });
          }}
        >
          <option value="DEFAULT" disabled>
            {props.language.select}
          </option>
          <option value="10">%10</option>
          <option value="20">%20</option>
          <option value="30">%30</option>
          <option value="40">%40</option>
          <option value="50">%50</option>
          <option value="60">%60</option>
          <option value="70">%70</option>
          <option value="80">%80</option>
          <option value="90">%90</option>
        </select>
      </div>
      <div className="input-group mb-2">
        <span className="input-group-text">{props.language.offerPrice}</span>
        <input
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          className="form-control"
          value={price}
          onChange={(e) => {
            setPrice(parseFloat(e.target.value));
            setOrder({
              ...order,
              price: parseFloat(e.target.value),
            });
          }}
        />
        <span className="input-group-text">{props.language.priceSign}</span>
      </div>
      <div className="text-end">
        <button
          data-bs-dismiss="modal"
          className="btn btn-primary"
          onClick={() => {
            props.addOrder(order);
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} className="me-2" />
          {props.language.sendOffer}
        </button>
      </div>
    </>
  );
}

export default connect(
  (state: any) => ({
    language: state.language.language,
    addOrderSuccess: state.order.addOrderSuccess,
  }),
  { addOrder }
)(SendOffer);
