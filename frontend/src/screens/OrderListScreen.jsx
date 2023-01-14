//npm packages
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
//components
import Message from "../components/Message";
import Loader from "../components/Loader";

//actions
import { ordersList } from "../actions/orderAction";
const OrderListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.ordersList);
  const { error, loading, orders } = orderList;

  const { success: successDelete } = useSelector((state) => state.userDelete);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(ordersList());
    } else {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);
  return (
    <>
      <h1>orders:</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped responsive hover bordered className='table-sm'>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERD</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <span className='center'>
                        {order.paidAt.substring(0, 10)}
                      </span>
                    ) : (
                      <span className='center'>&#10060;</span>
                    )}
                  </td>
                  <td>
                    {order.isDeliverd ? (
                      order.deliverdAt.substring(0, 10)
                    ) : (
                      <span className='center'>&#10060;</span>
                    )}
                  </td>

                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        DETAILS
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
