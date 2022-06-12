import { connect } from "react-redux";

function Success(props: any) {
  return (
    <div className="alert alert-success text-center">
      {props.language.success}
    </div>
  );
}

export default connect(
  (state: any) => ({
    language: state.language,
  }),
  {}
)(Success);
