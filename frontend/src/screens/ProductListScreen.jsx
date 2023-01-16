//npm packages
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
//components
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
//actions
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";

//constants
import { PRODUCT_CREATE_RESET } from "../constants/productsConstants";

const ProductListScreen = () => {
  const pageNumber = useParams().pageNumber || 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productList);
  const { error, loading, products, pages, page } = productsList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    error: deleteError,
    loading: loadingDelete,
    success: successDelete,
  } = productDelete;

  const {
    error: createError,
    loading: loadingCreate,
    success: successCreate,
    product: createdProduct,
  } = useSelector((state) => state.productCreate);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, userInfo, successDelete, successCreate, pageNumber]);

  //handlers
  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteProduct(productId));
      navigate(0);
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>products:</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> create product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {deleteError && <Message variant='danger'>{deleteError}</Message>}
      {loadingCreate && <Loader />}
      {createError && <Message variant='danger'>{createError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped responsive hover bordered className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>price</th>
                <th>category</th>
                <th>brand</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className='fa fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
