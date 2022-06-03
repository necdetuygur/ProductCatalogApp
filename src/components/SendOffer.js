import React from "react";
import { connect } from "react-redux";

function SendOffer(props) {
  const [price, setPrice] = React.useState(0);
  function calculate(percent) {
    setPrice((props.product.price * percent) / 100);
  }

  return (
    <>
      <div className="input-group mb-2">
        <span className="input-group-text">{props.language.quickOffers}</span>
        <select
          className="form-select form-select-sm"
          defaultValue={"DEFAULT"}
          onChange={(e) => {
            calculate(e.target.value);
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
            setPrice(e.target.value);
          }}
        />
        <span className="input-group-text">{props.language.priceSign}</span>
      </div>
    </>
  );
}

export default connect(
  (state) => ({
    language: state.language,
  }),
  {}
)(SendOffer);
