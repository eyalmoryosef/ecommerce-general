///npm packages
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Card, Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

//components
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

//actions
import { createOrder } from "../actions/orderAction";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  //price calculation

  cart.itemsPrice = Number(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  if (cart.itemsPrice > 0) {
    cart.shippingPrice = Number((cart.itemsPrice > 50 ? 0 : 20).toFixed(2));

    cart.taxPrice = Number(
      (cart.itemsPrice < 70 ? 0 : cart.itemsPrice * 0.17).toFixed(2)
    );

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  }

  const navigate = useNavigate();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [success, navigate, order._id]);

  //componnent
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address} ,{cart.shippingAddress.city} ,
                {cart.shippingAddress.postalCode}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Payment Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Item</h2>
              {cart.cartItems === 0 ? (
                <Message>'Your cart is empty!'</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='w-100'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
