import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { withdrawOffer } from "../actions";

function MyAccount(props) {
  const [currentTab, setCurrentTab] = React.useState(1);
  let navigate = useNavigate();
  React.useEffect(() => {
    !props.token && navigate("/");
    // eslint-disable-next-line
  }, [props.token]);

  return (
    <div className="card">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <span
              className={"nav-link cp " + (currentTab === 1 && "active")}
              onClick={() => {
                setCurrentTab(1);
              }}
            >
              {props.language.receivedOffers}
            </span>
          </li>
          <li className="nav-item">
            <span
              className={"nav-link cp " + (currentTab === 2 && "active")}
              onClick={() => {
                setCurrentTab(2);
              }}
            >
              {props.language.sentOffers}
            </span>
          </li>
          <li className="nav-item">
            <span
              className={"nav-link cp " + (currentTab === 3 && "active")}
              onClick={() => {
                setCurrentTab(3);
              }}
            >
              {props.language.myPurchases}
            </span>
          </li>
        </ul>
      </div>
      <div className="card-body p-0">
        {currentTab === 1 && <div>Birinci Sekme</div>}
        {currentTab === 2 && (
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
                      props.products.find(
                        (x) => x.id + "" === order.productId + ""
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
                      {props.language.showProduct}
                    </button>
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
        )}
        {currentTab === 3 && <div>Üçüncü Sekme</div>}
      </div>
    </div>
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
)(MyAccount);
