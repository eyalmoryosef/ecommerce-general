//npm packages
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
//actions
import { savePaymentMethod } from "../actions/cartActions";
//components
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <h1>Payment Method</h1>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3'>
          <Form.Label as='legend'>Select Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === "PayPal"}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            />
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              checked={paymentMethod === "Stripe"}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
