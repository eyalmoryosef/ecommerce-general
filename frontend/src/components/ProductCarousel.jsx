//npm packages
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

//components
import Message from "./Message";
import Loader from "./Loader";

//actions
import { topRatedProducts } from "../actions/productActions.js";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { loading, topProducts, error } = useSelector(
    (state) => state.productTopRated
  );

  useEffect(() => {
    dispatch(topRatedProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Carousel pause='hover' className='bg-dark'>
        {topProducts.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/products/${product._id}`}>
              <Image src={product.image} alt={product.name} />
              <Carousel.Caption className='carusel-caption'>
                <h2>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ProductCarousel;
