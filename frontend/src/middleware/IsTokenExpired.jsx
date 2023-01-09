import React from "react";
import jwt_decode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { logout } from "../actions/userActions";
import { useDispatch } from "react-redux";

const IsTokenExpired = () => {
  const { token } = JSON.parse(localStorage.getItem("userInfo"));
  const decoded = jwt_decode(token);
  console.log(decoded.exp * 1000 > Date.now());
  const dispatch = useDispatch();

  decoded.exp * 1000 < Date.now() && dispatch(logout());

  return decoded.exp * 1000 > Date.now() ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace={true} />
  );
};

export default IsTokenExpired;
