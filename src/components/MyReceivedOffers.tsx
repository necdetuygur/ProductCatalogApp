import React from "react";
import { connect } from "react-redux";
import config from "../config";
import axios from "axios";
import { useNavigate } from "react-router";
import { withdrawOffer, acceptOffer } from "../actions";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faXmark } from "@fortawesome/free-solid-svg-icons";

const getProductOffers = async (productId: number) => {
  var res = await axios.get(
    config.ENDPOINT_GET_BY_PRODUCT_ID_ORDER + "/" + productId
  );
  return await res;
};

function MyReceivedOffers(props: any) {
  let navigate = useNavigate();
  const [offers, setOffers] = React.useState([]);
  const [pageLoaded, setPageLoaded] = React.useState(false);

  const loadOffers = async () => {
    var tempOffers = [] as any;
    setOffers([]);
    setPageLoaded(false);
    var myProductIds = [] as any;
    props.products.forEach((product: any) => {
      if (product.userId + "" === localStorage.getItem("userId") + "") {
        myProductIds.push(product.id);
      }
    });
    const allOffersResponses = await Promise.all(
      myProductIds.map(getProductOffers)
    );
    allOffersResponses.forEach((r) => {
      r.data.forEach((offer: any) => {
        if (
          offer.statusId * 1 === 1 &&
          !props.products.find((x: any) => x.id + "" === offer.productId + "")
            .isSold
        ) {
          tempOffers.push(offer);
        }
      });
    });
    setOffers(tempOffers);
    setPageLoaded(true);
  };

  React.useEffect(() => {
    loadOffers();
    setTimeout(() => {
      setPageLoaded(true);
    }, 1e3);
    // eslint-disable-next-line
  }, [
    props.products.length,
    props.acceptOfferSuccess,
    props.withdrawOfferSuccess,
  ]);

  return (
    <>
      {offers.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>{props.language.productName}</th>
              <th>
                {props.language.name} {props.language.surname}
              </th>
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
                  {!!order.user
                    ? order.user.name + " " + order.user.surname
                    : "-"}
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
                  <button
                    className="btn btn-success btn-sm ms-1"
                    onClick={() => {
                      props.acceptOffer(order.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} className="me-2" />
                    {props.language.acceptOffer}
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-1"
                    onClick={() => {
                      props.withdrawOffer(order.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} className="me-2" />
                    {props.language.rejectOffer}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center m-5 p-5">
          {!pageLoaded ? <Loading /> : props.language.noData}
        </div>
      )}
    </>
  );
}

export default connect(
  (state: any) => ({
    language: state.language.language,
    token: state.user.token,
    products: state.product.products,
    acceptOfferSuccess: state.order.acceptOfferSuccess,
    withdrawOfferSuccess: state.order.withdrawOfferSuccess,
  }),
  { withdrawOffer, acceptOffer }
)(MyReceivedOffers);
