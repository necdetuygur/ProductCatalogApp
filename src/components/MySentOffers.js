import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { withdrawOffer } from "../actions";

function MySentOffers(props) {
  let navigate = useNavigate();
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>{props.language.productName}</th>
          <th>{props.language.offerPrice}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.mySentOffers.map((order) => (
          <tr key={order.id}>
            <td>
              {
                props.products.find((x) => x.id + "" === order.productId + "")
                  .name
              }
            </td>
            <td>
              {order.price}
              {props.language.priceSign}
            </td>
            <td className="text-end">
              <button
                className="btn btn-primary btn-sm ms-1"
                onClick={() => {
                  navigate("/product/" + order.productId);
                }}
              >
                {props.language.showProduct}
              </button>

              {order.statusId * 1 === 2 && (
                <button
                  className="btn btn-primary btn-sm ms-1"
                  onClick={() => {
                    // satın alma işlemi
                  }}
                >
                  {props.language.buy}
                </button>
              )}

              <button
                className="btn btn-danger btn-sm ms-1"
                onClick={() => {
                  props.withdrawOffer(order.id);
                }}
              >
                {props.language.withdrawOffer}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default connect(
  (state) => ({
    language: state.language,
    token: state.token,
    mySentOffers: state.mySentOffers,
    products: state.products,
    withdrawOfferSuccess: state.withdrawOfferSuccess,
  }),
  { withdrawOffer }
)(MySentOffers);
