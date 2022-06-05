import React from "react";
import { connect } from "react-redux";
import { addProduct } from "../actions";
import config from "../config";
import Success from "./Success";
import Loading from "./Loading";

function AddProduct(props) {
  const [product, setProduct] = React.useState({
    userId: localStorage.getItem("userId"),
    isOfferable: false,
  });
  const [uploadedImage, setUploadedImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function submitEvent() {
    setLoading(true);
    var url = config.ENDPOINT_PRODUCT_PICTURE_UPLOAD;
    const file = document.getElementById("file-input").files[0];
    const formData = new FormData();
    var fileExtension = file.name.split(".");
    fileExtension = fileExtension[fileExtension.length - 1];
    var acceptExtensions = ["jpg", "jpeg", "png"];
    if (!(acceptExtensions.indexOf(fileExtension) > -1)) {
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
    xhr.open("POST", url);
    xhr.send(formData);
  }

  return (
    <>
      {props.addProductSuccess.success && <Success />}
      <div className="row mb-2 mt-2 content">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              {!(uploadedImage.indexOf("ERR") > -1) && uploadedImage !== "" && (
                <button
                  class="btn btn-danger btn-sm w-100"
                  onClick={() => {
                    setUploadedImage("");
                    setProduct({ ...product, picture: "" });
                  }}
                >
                  {props.language.removeImage}
                </button>
              )}
              {!(uploadedImage.indexOf("ERR") > -1) && (
                <img
                  style={{ width: "100%", minHeight: "300px" }}
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
              {!uploadedImage && (
                <div className="alert alert-danger p-2 my-2" role="alert">
                  {props.language.pleasePictureSelect}
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
              {loading ? (
                <Loading />
              ) : (
                <>
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
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value={props.language.upload}
                      onClick={(e) => {
                        submitEvent(e);
                      }}
                    />
                  </div>
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
                    />
                  </div>
                  <div className="input-group mb-2">
                    <span className="input-group-text">
                      {props.language.category}
                    </span>
                    <select
                      className="form-select form-select-sm"
                      defaultValue={"DEFAULT"}
                      onChange={(e) => {
                        setProduct({ ...product, categoryId: e.target.value });
                      }}
                    >
                      <option value="DEFAULT" disabled>
                        {props.language.select}
                      </option>
                      {props.categories &&
                        props.categories.length > 0 &&
                        props.categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="input-group mb-2">
                    <span className="input-group-text">
                      {props.language.brand}
                    </span>
                    <select
                      className="form-select form-select-sm"
                      defaultValue={"DEFAULT"}
                      onChange={(e) => {
                        setProduct({ ...product, brandId: e.target.value });
                      }}
                    >
                      <option value="DEFAULT" disabled>
                        {props.language.select}
                      </option>
                      {props.brands &&
                        props.brands.length > 0 &&
                        props.brands.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="input-group mb-2">
                    <span className="input-group-text">
                      {props.language.color}
                    </span>
                    <select
                      className="form-select form-select-sm"
                      defaultValue={"DEFAULT"}
                      onChange={(e) => {
                        setProduct({ ...product, colorId: e.target.value });
                      }}
                    >
                      <option value="DEFAULT" disabled>
                        {props.language.select}
                      </option>
                      {props.colors &&
                        props.colors.length > 0 &&
                        props.colors.map((color) => (
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
                      defaultValue={"DEFAULT"}
                      onChange={(e) => {
                        setProduct({ ...product, useCaseId: e.target.value });
                      }}
                    >
                      <option value="DEFAULT" disabled>
                        {props.language.select}
                      </option>
                      {props.useCases &&
                        props.useCases.length > 0 &&
                        props.useCases.map((useCase) => (
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
                </>
              )}
            </div>
            <div className="card-footer">
              <span
                className="btn btn-primary float-end cp"
                onClick={() => {
                  props.addProduct(product);
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                  }, 1e3);
                }}
              >
                {props.language.save}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(
  (state) => ({
    language: state.language,
    brands: state.brands,
    categories: state.categories,
    colors: state.colors,
    useCases: state.useCases,
    addProductSuccess: state.addProductSuccess,
  }),
  {
    addProduct,
  }
)(AddProduct);
