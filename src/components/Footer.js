import React from "react";
import { connect } from "react-redux";
import { setLanguage } from "../actions";

function Footer(props) {
  return (
    <footer className="bg-dark text-white text-center">
      <div className="container p-4">
        <section className="mb-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            delectus facilis assumenda corporis rerum, impedit soluta dolor.
            Explicabo, hic, obcaecati, maiores esse eum consequatur tempore
            natus provident quibusdam veritatis qui. Autem magni repudiandae
            libero cum tempora cupiditate fugit facere iusto iure expedita
            voluptas ipsam mollitia eveniet dolores ullam, quos totam
            consequatur error culpa, assumenda dolorem velit optio voluptate
            quo. Reprehenderit! Quisquam suscipit eligendi eius soluta
            doloremque iusto, distinctio magnam. Error nesciunt vitae eius
            molestias, soluta voluptatum quos aspernatur nemo aliquid modi, quo
            hic expedita numquam iste omnis? Ad, quaerat ratione. Aliquid
            tempore nihil ratione. Ipsa, excepturi illo quod earum deserunt
            quasi et pariatur quia minus magni distinctio reprehenderit
            doloribus beatae vero consequuntur adipisci dolores fugit
            exercitationem ut itaque iusto doloremque? At, ullam illum! Quisquam
            unde sapiente illo commodi sint, in quod suscipit tempora culpa nam
            quis vel. Qui accusamus consequatur ipsam eaque. Vitae, similique
            omnis. Est, odit! Sapiente, adipisci officiis?
          </p>
        </section>
      </div>
      <div className="p-3">
        <div className="row justify-content-around">
          <div className="col-xl-6 col-md-4 col-sm-2">
            © {new Date().getFullYear()} {props.language.appName}
          </div>
          <div className="col-xl-2 col-md-4 col-sm-6">
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
      </div>
    </footer>
  );
}

export default connect(
  (state) => ({
    language: state.language,
    selectedLanguage: state.selectedLanguage,
  }),
  { setLanguage }
)(Footer);
