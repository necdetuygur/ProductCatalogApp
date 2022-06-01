import { connect } from "react-redux";

function Cart(props) {
  return <pre>{JSON.stringify(props.cart, 2, 2)}</pre>;
}

export default connect(
  (state) => ({
    cart: state.cart,
  }),
  {}
)(Cart);
