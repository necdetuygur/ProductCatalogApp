import React from "react";
import { connect } from "react-redux";
import { setLanguage, setTheme } from "../actions";

function Footer(props: any) {
  return (
    <footer className="bg-dark text-white text-center">
      <div className="container p-4">
        <section className="mb-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            delectus facilis assumenda corporis rerum, impedit soluta dolor.
            Explicabo, hic, obcaecati, maiores esse eum consequatur tempore
            natus provident quibusdam veritatis qui.
          </p>
        </section>
      </div>
      <div className="p-3">
        <div className="row justify-content-around">
          <div className="col-xl-6 col-md-4 col-sm-2">
            © {new Date().getFullYear()} {props.language.appName}
          </div>
          <div className="col-xl-2 col-md-4 col-sm-4">
            <div className="input-group input-group-sm mb-2">
              <span className="input-group-text">
                {props.language.language}
              </span>
              <select
                className="form-select form-select-sm"
                defaultValue={props.selectedLanguage}
                onChange={(e) => {
                  props.setLanguage(e.target.value);
                }}
              >
                <option value="en">{props.language.en}</option>
                <option value="tr">{props.language.tr}</option>
              </select>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-sm-4">
            <div className="input-group input-group-sm mb-2">
              <span className="input-group-text">{props.language.theme}</span>
              <select
                className="form-select form-select-sm"
                defaultValue={props.theme}
                onChange={(e) => {
                  props.setTheme(e.target.value);
                  if (window.top != null) {
                    // eslint-disable-next-line
                    window.top.location.href = window.top.location.href;
                  }
                }}
              >
                <option value="bootstrap.min">{props.language.default}</option>
                <option value="litera">Litera</option>
                <option value="lux">Lux</option>
                <option value="pulse">Pulse</option>
                <option value="simplex">Simplex</option>
                <option value="sketchy">Sketchy</option>
                <option value="superhero">Superhero</option>
                <option value="united">United</option>
                <option value="vapor">Vapor</option>
                <option value="yeti">Yeti</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default connect(
  (state: any) => ({
    language: state.language.language,
    selectedLanguage: state.language.selectedLanguage,
    theme: state.theme.theme,
  }),
  { setLanguage, setTheme }
)(Footer);
