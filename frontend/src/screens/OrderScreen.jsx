//npm packages
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Card, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

//constants
import { ORDER_PAY_RESET } from "../constants/orderConstants";

//components
import Loader from "../components/Loader";
import Message from "../components/Message";

//actions
import { getOrderDetails, payOrder } from "../actions/orderAction";

const OrderScreen = () => {
  const dispatch = useDispatch();

  const orderId = useParams().id;
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, [dispatch, successPay, orderId, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order._id, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address} ,{order.shippingAddress.city} ,
                {order.shippingAddress.postalCode}
              </p>
              {order.isDeliverd ? (
                <Message variant='success'>Paid On {order.deliverdAt}</Message>
              ) : (
                <Message variant='danger'>Not Deliverd!</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Payment Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid On {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid!</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Item</h2>
              {order.cartItems === 0 ? (
                <Message>'Your cart is empty!'</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
