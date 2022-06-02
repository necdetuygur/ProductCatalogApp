import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import config from "../config";
import { getUserById, getProducts } from "../actions";

function ProductDetail(props) {
  let params = useParams();
  const [product, setProduct] = React.useState({});

  React.useEffect(() => {
    props.getProducts();
    console.log("props.products", props.products);
    // eslint-disable-next-line
    const getUser1 = () => {
      console.log("getUser1 called", props.products);
      if (!(Object.keys(product).indexOf("userId") > -1)) {
        setTimeout(getUser1, 3333);
        return;
      }
      props.getUserById(product.userId);
    };

    getUser1();

    var tempProducts = props.products.slice();
    var tempProduct = tempProducts.find(
      (product) => product.id + "" === params.productId + ""
    );

    setProduct(tempProduct);

    // eslint-disable-next-line
  }, []);

  return (
    props.products &&
    props.products.length > 0 &&
    product && (
      <div className="row mb-2 mt-2 content">
        <pre>{JSON.stringify(product, 2, 2)}</pre>
        <div className="col-xl-6">
          <div className="card mb-3">
            <div className="card-header">{props.language.picture}</div>
            <div className="card-body p-0">
              <img
                style={{ width: "100%" }}
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
                    <div className="col-4">{props.language.productName}</div>
                    <div className="col-4">{product.name}</div>
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
                  {/* <li className="d-flex list-group-item justify-content-between">
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
                  </li> */}
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
            <div className="card-footer">
              <span
                className="btn btn-primary float-end cp ms-1"
                onClick={() => {}}
              >
                {props.language.buy}
              </span>
              <span
                className="btn btn-primary float-end cp ms-1"
                onClick={() => {}}
              >
                {props.language.bid}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
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
  }),
  {
    getUserById,
    getProducts,
  }
)(ProductDetail);
