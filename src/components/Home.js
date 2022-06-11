import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import Product from "./Product";
import { useParams } from "react-router-dom";
import { setCategory } from "../actions";
import Loading from "./Loading";

function Home(props) {
  let params = useParams();
  useEffect(() => {
    if (params.category) {
      props.setCategory(params.category);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      {props.categories && props.categories.length > 0 ? (
        props.selectedCategory !== "" ? (
          props.products
            .filter(
              (product) =>
                product.categoryId ===
                props.categories.find(
                  (category) => category.slug === props.selectedCategory
                ).id
            )
            .map((product) => <Product key={product.id} product={product} />)
        ) : (
          props.products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        )
      ) : (
        <Loading />
      )}
      {props.categories &&
        props.categories.length > 0 &&
        props.products &&
        props.products.length < 1 && (
          <div className="text-center m-1 p-1">{props.language.noProduct}</div>
        )}
    </div>
  );
}

export default connect(
  (state) => ({
    language: state.language,
    categories: state.categories,
    products: state.products,
    selectedCategory: state.selectedCategory,
  }),
  { setCategory }
)(Home);
