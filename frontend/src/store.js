import {
  configureStore,
  combineReducers,
  applyMiddelware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { productListReducer } from "./reducers/productReducers.js";

const reducers = combineReducers({
  productList: productListReducer,
});
const initialState = {};
const middleware = [thunk];

const store = configureStore({
  reducer: reducers,
  preloadedState: initialState,
  middleware: [...middleware],
});

export default store;
