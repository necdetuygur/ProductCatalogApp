import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import config from "../config";
import { getUserById, withdrawOffer } from "../actions";
import Loading from "./Loading";
import Modal from "./Modal";
import SendOffer from "./SendOffer";
import Buy from "./Buy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faWallet,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function ProductDetail(props: any) {
  let params = useParams();
  const [product, setProduct] = React.useState({
    isOfferable: false,
    userId: "",
    id: "",
    isSold: false,
    name: "",
    description: "",
    price: "",
    categoryId: "",
    brandId: "",
    colorId: "",
    useCaseId: "",
    picture: "",
  });
  const [thisProductIsMyProduct, setThisProductIsMyProduct] =
    React.useState(false);
  const [category, setCategory] = React.useState({ name: "" });
  const [brand, setBrand] = React.useState({ name: "" });
  const [color, setColor] = React.useState({ name: "" });
  const [useCase, setUseCase] = React.useState({ name: "" });

  React.useEffect(() => {
    setProduct(
      props.products.find(
        (product: any) => product.id + "" === params.productId + ""
      )
    );

    !!product &&
      Object.keys(product).indexOf("userId") > -1 &&
      props.getUserById(product.userId);

    props.products.forEach((product: any) => {
      if (
        product.userId + "" === localStorage.getItem("userId") + "" &&
        product.id + "" === params.productId + ""
      ) {
        setThisProductIsMyProduct(true);
      }
    });

    if (
      props.categories.length > 0 &&
      props.brands.length > 0 &&
      props.colors.length > 0 &&
      props.useCases.length > 0 &&
      !!product &&
      product.hasOwnProperty("categoryId") &&
      product.hasOwnProperty("brandId") &&
      product.hasOwnProperty("colorId") &&
      product.hasOwnProperty("useCaseId")
    ) {
      setCategory(
        props.categories.find(
          (item: any) => item.id + "" === product.categoryId + ""
        )
      );
      setBrand(
        props.brands.find((item: any) => item.id + "" === product.brandId + "")
      );
      setColor(
        props.colors.find((item: any) => item.id + "" === product.colorId + "")
      );
      setUseCase(
        props.useCases.find(
          (item: any) => item.id + "" === product.useCaseId + ""
        )
      );
    }

    // eslint-disable-next-line
  }, [
    props.products.length,
    product,
    props.categories.length,
    props.brands.length,
    props.colors.length,
    props.useCases.length,
  ]);

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
              style={{
                width: "100%",
                height: "500px",
                objectFit: "contain",
              }}
              src={config.PICTURE_BASE + "/" + product.picture}
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
                    typeof props.productDetailUser.name === "undefined" ? (
                      <Loading onlyImage={true} width={"16px"} />
                    ) : (
                      props.productDetailUser.name +
                      " " +
                      props.productDetailUser.surname
                    )}
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
                  <div className="col-4">{category && category.name}</div>
                </li>

                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">{props.language.brand}</div>
                  <div className="col-4">{brand && brand.name}</div>
                </li>

                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">{props.language.color}</div>
                  <div className="col-4">{color && color.name}</div>
                </li>

                <li className="d-flex list-group-item justify-content-between">
                  <div className="col-4">{props.language.useCase}</div>
                  <div className="col-4">{useCase && useCase.name}</div>
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
                buttonText={
                  <>
                    <FontAwesomeIcon icon={faWallet} className="me-2" />
                    {props.language.buy}
                  </>
                }
                buttonClassName="btn btn-success cp ms-1"
              >
                <Buy product={product} isProductBuy={true} />
              </Modal>

              {product.isOfferable &&
                // == true ? Teklif ver : Withdraw
                !props.mySentOffers.find(
                  (order: any) => order.productId + "" === product.id + ""
                ) && (
                  <Modal
                    modalId="sendOffer"
                    title={props.language.sendOffer}
                    buttonText={
                      <>
                        <FontAwesomeIcon icon={faArrowUp} className="me-2" />
                        {props.language.sendOffer}
                      </>
                    }
                    buttonClassName="btn btn-primary cp ms-1"
                  >
                    <SendOffer product={product} />
                  </Modal>
                )}
              {!!props.mySentOffers.find(
                (order: any) => order.productId + "" === product.id + ""
              ) && (
                <button
                  className="btn btn-danger ms-1"
                  onClick={() => {
                    props.withdrawOffer(
                      props.mySentOffers.find(
                        (order: any) => order.productId + "" === product.id + ""
                      ).id
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} className="me-2" />
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
  (state: any) => ({
    language: state.language.language,
    products: state.product.products,
    categories: state.category.categories,
    brands: state.brand.brands,
    colors: state.color.colors,
    useCases: state.useCase.useCases,
    productDetailUser: state.product.productDetailUser,
    mySentOffers: state.order.mySentOffers,
  }),
  {
    getUserById,
    withdrawOffer,
  }
)(ProductDetail);
