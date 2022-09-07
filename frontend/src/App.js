import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from "react-bootstrap";
import {Route,Routes,BrowserRouter as Router} from "react-router-dom";
import HomeScreen from "./Screens/Home";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/loginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShoppingScreen from "./Screens/ShoppingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import UsersListScreen from "./Screens/UsersListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import OrderListScreen from "./Screens/OrderListScreen";


function App() {
  return (
    <Router>
    <Header></Header>
    <Container>
      <Routes>
       
        <Route path='/' element={<HomeScreen/>} exact />
        <Route path="/signin"   element={<LoginScreen></LoginScreen>}  exact></Route>
        <Route path="/register"   element={<RegisterScreen></RegisterScreen>}  exact></Route>
        <Route path="/profile"   element={<ProfileScreen></ProfileScreen>}  exact></Route>
        <Route path="/product/:id"   element={<ProductScreen></ProductScreen>}  exact></Route>
        <Route path="/cart/:id"  element={<CartScreen></CartScreen>} exact />
        <Route path="/cart"  element={<CartScreen></CartScreen>} exact />
        <Route path="/payment"   element={<PaymentScreen></PaymentScreen>}  exact></Route>
        <Route path="/shipping"  element={<ShoppingScreen></ShoppingScreen>} exact />
        <Route path="/placeorder"  element={<PlaceOrderScreen></PlaceOrderScreen>} exact />
        <Route path="/order/:id"  element={<OrderScreen></OrderScreen>} exact />
        <Route path="/Admin/userlist"  element={<UsersListScreen></UsersListScreen>} exact />
        <Route path="/Admin/Productlist"  element={<ProductListScreen></ProductListScreen>} exact />
        <Route path="/admin/user/:id/edit"  element={<UserEditScreen></UserEditScreen>} exact />
        <Route path="/admin/product/:id/edit"  element={<ProductEditScreen></ProductEditScreen>} exact />
        <Route path='/admin/orderlist' element={<OrderListScreen></OrderListScreen>} exact />
        <Route path='/search/:keyword'  element={<HomeScreen/>} exact />
        <Route path='/page/:pageNumber'  element={<HomeScreen/>} exact />
        <Route
            path='/search/:keyword/page/:pageNumber'
            element={<HomeScreen/>}
            exact
          />
      </Routes>
    </Container>
    <Footer></Footer>
    </Router>
  );
}

export default App;
