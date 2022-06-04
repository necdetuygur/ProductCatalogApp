import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import config from "../config";
import { getUserById, withdrawOffer } from "../actions";
import Loading from "./Loading";
import Modal from "./Modal";
import SendOffer from "./SendOffer";
import Buy from "./Buy";

function ProductDetail(props) {
  let params = useParams();
  const [product, setProduct] = React.useState({});
  const [thisProductIsMyProduct, setThisProductIsMyProduct] =
    React.useState(false);

  React.useEffect(() => {
    setProduct(
      props.products.find(
        (product) => product.id + "" === params.productId + ""
      )
    );

    !!product &&
      Object.keys(product).indexOf("userId") > -1 &&
      props.getUserById(product.userId);

    props.products.forEach((product) => {
      if (
        product.userId + "" === localStorage.getItem("userId") + "" &&
        product.id + "" === params.productId + ""
      ) {
        setThisProductIsMyProduct(true);
      }
    });

    // eslint-disable-next-line
  }, [props.products.length, product]);

  return props.products.length > 0 &&
    props.categories.length > 0 &&
    props.brands.length > 0 &&
    props.colors.length > 0 &&
    props.useCases.length > 0 &&
    props.mySentOffers.length > -1 &&
    !!product &&
    Object.keys(product).indexOf("userId") > -1 &&
    !!props.productDetailUser ? (
    <div className="row mb-2 mt-2 content">
      <div className="col-xl-6">
        <div className="card mb-3">
          <div className="card-header">{props.language.picture}</div>
          <div className="card-body p-0">
            <img
              style={{ width: "100%", minHeight: "300px" }}
              src={
                config.PICTURE_BASE +
                "/" +
                product.picture +
                "?i=" +
                new Date() * Math.random()
              }
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="col-xl-6">
        <div className="card">
          <div className="card-header">{props.language.productDetail}</div>
          <div className="card-body p-1">
            {
              <ul className="list-group list-group-flush">
                {/*  */}

                {product.isSold && (
                  <li className="list-group-item justify-content-between">
                    <div className="alert alert-danger">
                      {props.language.thisProductIsSold}
                    </div>
                  </li>
                )}

                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">{props.language.productName}</div>
                  <div className="col-4">{product.name}</div>
                </li>

                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">{props.language.user}</div>
                  <div className="col-4">
                    {props.productDetailUser &&
                      props.productDetailUser.name +
                        " " +
                        props.productDetailUser.surname}
                  </div>
                </li>

                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">
                    {props.language.productDescription}
                  </div>
                  <div className="col-4">{product.description}</div>
                </li>

                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">{props.language.productPrice}</div>
                  <div className="col-4">
                    {product.price}
                    {props.language.priceSign}
                  </div>
                </li>

                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">
                    {props.language.productDescription}
                  </div>
                  <div className="col-4">{product.description}</div>
                </li>

                {/*  */}
                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">{props.language.category}</div>
                  <div className="col-4">
                    {
                      props.categories.find(
                        (item) => item.id + "" === product.categoryId + ""
                      ).name
                    }
                  </div>
                </li>

                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">{props.language.brand}</div>
                  <div className="col-4">
                    {
                      props.brands.find((item) => item.id === product.brandId)
                        .name
                    }
                  </div>
                </li>

                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">{props.language.color}</div>
                  <div className="col-4">
                    {
                      props.colors.find((item) => item.id === product.colorId)
                        .name
                    }
                  </div>
                </li>

                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">{props.language.useCase}</div>
                  <div className="col-4">
                    {
                      props.useCases.find(
                        (item) => item.id === product.useCaseId
                      ).name
                    }
                  </div>
                </li>
                {/*  */}

                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">
                    {props.language.productIsOfferable}
                  </div>
                  <div className="col-4">
                    {product.isOfferable
                      ? props.language.yes
                      : props.language.no}
                  </div>
                </li>

                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">{props.language.productIsSold}</div>
                  <div className="col-4">
                    {product.isSold ? props.language.yes : props.language.no}
                  </div>
                </li>
                {/*  */}
              </ul>
            }
          </div>
          {!thisProductIsMyProduct && !product.isSold && (
            <div className="card-footer text-end">
              <Modal
                modalId="buy"
                title={props.language.buy}
                buttonText={props.language.buy}
                buttonClassName="btn btn-success cp ms-1"
              >
                <Buy product={product} isProductBuy={true} />
              </Modal>

              {product.isOfferable &&
                // == true ? Teklif ver : Withdraw
                !props.mySentOffers.find(
                  (order) => order.productId + "" === product.id + ""
                ) && (
                  <Modal
                    modalId="sendOffer"
                    title={props.language.sendOffer}
                    buttonText={props.language.sendOffer}
                    buttonClassName="btn btn-primary cp ms-1"
                  >
                    <SendOffer product={product} />
                  </Modal>
                )}
              {!!props.mySentOffers.find(
                (order) => order.productId + "" === product.id + ""
              ) && (
                <button
                  className="btn btn-danger ms-1"
                  onClick={() => {
                    props.withdrawOffer(
                      props.mySentOffers.find(
                        (order) => order.productId + "" === product.id + ""
                      ).id
                    );
                  }}
                >
                  {props.language.withdrawOffer}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default connect(
  (state) => ({
    language: state.language,
    products: state.products,
    categories: state.categories,
    brands: state.brands,
    colors: state.colors,
    useCases: state.useCases,
    productDetailUser: state.productDetailUser,
    mySentOffers: state.mySentOffers,
  }),
  {
    getUserById,
    withdrawOffer,
  }
)(ProductDetail);
