import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function SaleOK(props: any) {
  return (
    <div className="text-center m-5 p-5">
      <FontAwesomeIcon icon={faCheck} className="me-2" />
      {props.language.saleOk}.
    </div>
  );
}

export default connect(
  (state: any) => ({
    language: state.language.language,
  }),
  {}
)(SaleOK);
