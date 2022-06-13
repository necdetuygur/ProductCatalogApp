import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import MyPurchases from "./MyPurchases";
import MyReceivedOffers from "./MyReceivedOffers";
import MySentOffers from "./MySentOffers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";

function MyAccount(props: any) {
  let navigate = useNavigate();
  const [currentTab, setCurrentTab] = React.useState(1);
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
              <FontAwesomeIcon icon={faArrowDown} className="me-2" />
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
              <FontAwesomeIcon icon={faArrowUp} className="me-2" />
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
              <FontAwesomeIcon icon={faShoppingBasket} className="me-2" />
              {props.language.myPurchases}
            </span>
          </li>
        </ul>
      </div>
      <div className="card-body p-0" style={{ minHeight: "400px" }}>
        {currentTab === 1 && <MyReceivedOffers />}
        {currentTab === 2 && <MySentOffers />}
        {currentTab === 3 && <MyPurchases />}
      </div>
    </div>
  );
}

export default connect(
  (state: any) => ({
    language: state.language.language,
    token: state.user.token,
  }),
  {}
)(MyAccount);
