//npm packages
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

//components
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
//actions
import { listProducts } from "../actions/productActions.js";

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const dispatch = useDispatch();
  const keyword = useParams().keyword;

  const pageNumber = useParams().pageNumber || 1;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>lastest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
