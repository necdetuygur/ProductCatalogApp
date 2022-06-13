import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function MyPurchases(props: any) {
  let navigate = useNavigate();
  const [offers, setOffers] = React.useState([] as any);
  React.useEffect(() => {
    var tempOffers = [] as any;
    props.mySentOffers.forEach((order: any) => {
      if (
        order.statusId * 1 === 3 &&
        props.products.find((x: any) => x.id + "" === order.productId + "")
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
  {}
)(MyPurchases);
