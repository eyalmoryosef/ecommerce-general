//npm packages
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
//components
import Message from "../components/Message";
import Loader from "../components/Loader";

//actions
import { listProducts, deleteProduct } from "../actions/productActions";
const ProductListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productList);
  const { error, loading, products } = productsList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    error: deleteError,
    loading: loadingDelete,
    succsess: successDelete,
  } = productDelete;

  //const { success: successDelete } = useSelector((state) => state.userDelete);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  //handlers
  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteProduct(productId));
      navigate(0);
    }
  };

  const createProductHandler = () => {};

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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
                    <LinkContainer to={`/admin/pruduct/${product._id}/edit`}>
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
      )}
    </>
  );
};

export default ProductListScreen;
