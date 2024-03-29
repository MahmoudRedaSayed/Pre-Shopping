import {createStore,combineReducers,applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { productListReducer,productDetailsReducer, productCreateReducer, productDeleteReducer, productUpdateReducer, productReviewCreateReducer, productTopRatedReducer } from "./reducers/productReducers";
import {cartReducer } from "./reducers/cartReducers";
import { userLoginReducer } from "./reducers/userReducers";
import { userRegisterReducer } from "./reducers/userReducers";
import { userUpdateProfileReducer,userDetailsReducer,userListReducer,userDeleteReducer,userUpdateReducer } from "./reducers/userReducers";
import { orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer } from "./reducers/orderReducers";
const reducer=combineReducers({
    productList:productListReducer,
    productDetails: productDetailsReducer,
    productCreate:productCreateReducer,
    productDelete:productDeleteReducer,
    productUpdate:productUpdateReducer,
    cart: cartReducer,
    userLoginReducer:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderListMy: orderListMyReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    orderList:orderListMyReducer,
    productReviewCreate:productReviewCreateReducer,
    productTopRated:productTopRatedReducer,
});
const cartItems=localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[];
const userInfo=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

// const cartIemts=localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):{};

const initialState={userLoginReducer:{userInfo},userDetails:{user:userInfo},cart:{cartItems,shippingAddress: shippingAddressFromStorage},userRegister:{userInfo}};

const middleware=[thunk];

const store= createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;