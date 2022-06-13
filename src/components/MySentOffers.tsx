import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { withdrawOffer } from "../actions";
import Modal from "./Modal";
import Buy from "./Buy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons";

function MySentOffers(props: any) {
  let navigate = useNavigate();
  const [offers, setOffers] = React.useState([] as any);
  React.useEffect(() => {
    var tempOffers = [] as any;
    props.mySentOffers.forEach((order: any) => {
      if (
        (order.statusId * 1 === 1 || order.statusId * 1 === 2) &&
        !props.products.find((x: any) => x.id + "" === order.productId + "")
          .isSold
      ) {
        tempOffers.push(order);
      }
    });
    setOffers(tempOffers);
    // eslint-disable-next-line
  }, [props.products.length, props.withdrawOfferSuccess]);

  return (
    <>
      {offers.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>{props.language.productName}</th>
              <th>{props.language.offerPrice}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {offers.map((order: any) => (
              <tr key={order.id}>
                <td>
                  {
                    props.products.find(
                      (x: any) => x.id + "" === order.productId + ""
                    ).name
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
                    <FontAwesomeIcon icon={faEye} className="me-2" />
                    {props.language.showProduct}
                  </button>

                  {order.statusId * 1 === 2 && (
                    <Modal
                      modalId="buy"
                      title={props.language.buy}
                      buttonText={props.language.buy}
                      buttonClassName="btn btn-success btn-sm cp ms-1"
                    >
                      <Buy
                        isProductBuy={false}
                        orderId={order.id}
                        productId={order.productId}
                      />
                    </Modal>
                  )}

                  <button
                    className="btn btn-danger btn-sm ms-1"
                    onClick={() => {
                      props.withdrawOffer(order.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} className="me-2" />
                    {props.language.withdrawOffer}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center m-5 p-5">{props.language.noData}</div>
      )}
    </>
  );
}

export default connect(
  (state: any) => ({
    language: state.language.language,
    token: state.user.token,
    mySentOffers: state.order.mySentOffers,
    products: state.product.products,
    withdrawOfferSuccess: state.order.withdrawOfferSuccess,
  }),
  { withdrawOffer }
)(MySentOffers);
