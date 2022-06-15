import React from "react";
import { connect } from "react-redux";
import { addProduct, getProducts } from "../actions";
import config from "../config";
import Success from "./Success";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faRemove,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

function AddProduct(props: any) {
  const [product, setProduct] = React.useState({
    userId: localStorage.getItem("userId"),
    isOfferable: false,
    picture: "",
    colorId: "DEFAULT",
    brandId: "DEFAULT",
    useCaseId: "DEFAULT",
    name: "",
    description: "",
    price: "",
    categoryId: "DEFAULT",
  });
  const [uploadedImage, setUploadedImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([] as any);
  React.useEffect(() => {
    if (props.addProductSuccess && props.addProductSuccess.success) {
      setProduct({
        userId: localStorage.getItem("userId"),
        isOfferable: false,
        picture: "",
        colorId: "DEFAULT",
        brandId: "DEFAULT",
        useCaseId: "DEFAULT",
        name: "",
        description: "",
        price: "",
        categoryId: "DEFAULT",
      });
      setUploadedImage("");
      props.getProducts();
    }
    // eslint-disable-next-line
  }, [props.addProductSuccess.success]);

  function submitEvent() {
    setLoading(true);
    const obj = document.getElementById(
      "file-input"
    ) as HTMLInputElement | null;
    if (obj != null) {
      const files = obj.files;
      if (files != null) {
        const file = files[0];
        if (!file) {
          setUploadedImage("ERR_NO_SELECTED");
          setLoading(false);
          return;
        } else {
          setLoading(true);
          const formData = new FormData();
          const fileExtension = file.name.split(".");
          const extension = fileExtension[fileExtension.length - 1];
          var acceptExtensions = ["jpg", "jpeg", "png"];
          if (!(acceptExtensions.indexOf(extension) > -1)) {
            setUploadedImage("ERR_EXTENSION");
            setLoading(false);
            return;
          }

          if (file.size > 400 * 1024) {
            setUploadedImage("ERR_SIZE");
            setLoading(false);
            return;
          }
          formData.append("file", file);
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            setUploadedImage(xhr.responseText);
            setProduct({ ...product, picture: xhr.responseText });
            setLoading(false);
          };
          xhr.open("POST", config.ENDPOINT_PRODUCT_PICTURE_UPLOAD);
          xhr.send(formData);
        }
      }
    }
  }

  function doSave() {
    var saveErrors = [];
    if (!!product.name && product.name.length > 100) {
      saveErrors.push(props.language.ERR_PRODUCTNAMELONG);
    }
    if (!!product.description && product.description.length > 500) {
      saveErrors.push(props.language.ERR_PRODUCTDESCRIPTIONLONG);
    }
    if (!product.categoryId || product.categoryId === "DEFAULT") {
      saveErrors.push(props.language.ERR_CATEGORY_REQUIRED);
    }
    if (!product.useCaseId || product.useCaseId === "DEFAULT") {
      saveErrors.push(props.language.ERR_USECASE_REQUIRED);
    }
    if (
      !product.price ||
      product.price === "" ||
      product.price === "." ||
      product.price === ","
    ) {
      saveErrors.push(props.language.ERR_PRICE_REQUIRED);
    }
    if (!uploadedImage) {
      saveErrors.push(props.language.pleasePictureSelect);
    }
    setErrors(saveErrors);
    if (saveErrors.length > 0) {
      setLoading(false);
      return;
    }
    props.addProduct(product);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1e3);
  }

  return (
    <>
      {props.addProductSuccess.success && <Success />}
      {loading && <Loading />}
      <div className="row mb-2 mt-2 content">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              {!(uploadedImage.indexOf("ERR") > -1) && uploadedImage !== "" && (
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => {
                    setUploadedImage("");
                    setProduct({ ...product, picture: "" });
                  }}
                >
                  <FontAwesomeIcon icon={faRemove} className="me-2" />
                  {props.language.removeImage}
                </button>
              )}
              {!(uploadedImage.indexOf("ERR") > -1) && (
                <img
                  style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "contain",
                  }}
                  src={config.PICTURE_BASE + "/" + uploadedImage}
                  alt=""
                  className="mb-2"
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header">{props.language.addProduct}</div>
            <div className="card-body p-2">
              {errors.length > 0 &&
                errors.map((error: any) => (
                  <div
                    key={error}
                    className="alert alert-danger p-2 my-2"
                    role="alert"
                  >
                    {error}
                  </div>
                ))}
              {uploadedImage.indexOf("ERR_NO_SELECTED") > -1 && (
                <div className="alert alert-danger p-2 my-2" role="alert">
                  {props.language.ERR_NO_SELECTED}
                </div>
              )}
              {uploadedImage.indexOf("ERR_EXTENSION") > -1 && (
                <div className="alert alert-danger p-2 my-2" role="alert">
                  {props.language.ERR_EXTENSION}
                </div>
              )}
              {uploadedImage.indexOf("ERR_SIZE") > -1 && (
                <div className="alert alert-danger p-2 my-2" role="alert">
                  {props.language.ERR_SIZE}
                </div>
              )}
              {!(
                !(uploadedImage.indexOf("ERR") > -1) && uploadedImage !== ""
              ) && (
                <div className="input-group mb-2">
                  <span className="input-group-text">
                    {props.language.picture}
                  </span>
                  <input
                    type="file"
                    name="file"
                    id="file-input"
                    className="form-control"
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => {
                      submitEvent();
                    }}
                  >
                    <FontAwesomeIcon icon={faFileUpload} className="me-2" />
                    {props.language.upload}
                  </button>
                </div>
              )}
              <div className="input-group mb-2">
                <span className="input-group-text">
                  {props.language.productName}
                </span>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setProduct({ ...product, name: e.target.value });
                  }}
                  value={product.name}
                />
              </div>
              <div className="input-group mb-2">
                <span className="input-group-text">
                  {props.language.productDescription}
                </span>
                <textarea
                  className="form-control"
                  onChange={(e) => {
                    setProduct({ ...product, description: e.target.value });
                  }}
                  value={product.description}
                ></textarea>
              </div>
              <div className="input-group mb-2">
                <span className="input-group-text">
                  {props.language.productPrice}
                </span>
                <input
                  type="number"
                  min="0.00"
                  max="10000.00"
                  step="0.01"
                  className="form-control"
                  onChange={(e) => {
                    setProduct({ ...product, price: e.target.value });
                  }}
                  value={product.price}
                />
                <span className="input-group-text">
                  {props.language.priceSign}
                </span>
              </div>
              <div className="input-group mb-2">
                <span className="input-group-text">
                  {props.language.category}
                </span>
                <select
                  className="form-select form-select-sm"
                  onChange={(e) => {
                    setProduct({ ...product, categoryId: e.target.value });
                  }}
                  value={product.categoryId}
                >
                  <option value="DEFAULT" disabled>
                    {props.language.select}
                  </option>
                  {props.categories &&
                    props.categories.length > 0 &&
                    props.categories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input-group mb-2">
                <span className="input-group-text">{props.language.brand}</span>
                <select
                  className="form-select form-select-sm"
                  onChange={(e) => {
                    setProduct({ ...product, brandId: e.target.value });
                  }}
                  value={product.brandId}
                >
                  <option value="DEFAULT" disabled>
                    {props.language.select}
                  </option>
                  {props.brands &&
                    props.brands.length > 0 &&
                    props.brands.map((brand: any) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input-group mb-2">
                <span className="input-group-text">{props.language.color}</span>
                <select
                  className="form-select form-select-sm"
                  onChange={(e) => {
                    setProduct({ ...product, colorId: e.target.value });
                  }}
                  value={product.colorId}
                >
                  <option value="DEFAULT" disabled>
                    {props.language.select}
                  </option>
                  {props.colors &&
                    props.colors.length > 0 &&
                    props.colors.map((color: any) => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input-group mb-2">
                <span className="input-group-text">
                  {props.language.useCase}
                </span>
                <select
                  className="form-select form-select-sm"
                  onChange={(e) => {
                    setProduct({ ...product, useCaseId: e.target.value });
                  }}
                  value={product.useCaseId}
                >
                  <option value="DEFAULT" disabled>
                    {props.language.select}
                  </option>
                  {props.useCases &&
                    props.useCases.length > 0 &&
                    props.useCases.map((useCase: any) => (
                      <option key={useCase.id} value={useCase.id}>
                        {useCase.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input-group mb-2">
                <span className="input-group-text">
                  {props.language.productIsOfferable}
                </span>
                <select
                  className="form-select form-select-sm"
                  defaultValue={"0"}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      isOfferable: e.target.value === "1",
                    });
                  }}
                >
                  <option value="1">{props.language.yes}</option>
                  <option value="0">{props.language.no}</option>
                </select>
              </div>
            </div>
            <div className="card-footer">
              <button
                type="button"
                className="btn btn-primary float-end cp"
                onClick={() => {
                  doSave();
                }}
              >
                <FontAwesomeIcon icon={faSave} className="me-2" />
                {props.language.save}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(
  (state: any) => ({
    language: state.language.language,
    brands: state.brand.brands,
    categories: state.category.categories,
    colors: state.color.colors,
    useCases: state.useCase.useCases,
    addProductSuccess: state.product.addProductSuccess,
  }),
  {
    addProduct,
    getProducts,
  }
)(AddProduct);
