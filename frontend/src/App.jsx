//npm packages
import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

//screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import UserScreen from "./screens/UserScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

//middleware
//import IsTokenExpired from "./middleware/IsTokenExpired";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/login' element={<UserScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/' element={<HomeScreen />} />

            {/* <Route element={<IsTokenExpired />}> */}
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/orderlist' element={<OrderListScreen />} />
            <Route path='/admin/productlist' element={<ProductListScreen />} />

            <Route
              path='/admin/product/:id/edit'
              element={<ProductEditScreen />}
            />
            <Route path='/admin/users/:id/edit' element={<UserEditScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/cart' element={<CartScreen />}>
              <Route path=':id' element={<CartScreen />} />
            </Route>
            {/* </Route> */}
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
