import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from "react-bootstrap";
import {Route,Routes,BrowserRouter as Router} from "react-router-dom";
import Home from "./Screens/Home";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/loginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShoppingScreen from "./Screens/ShoppingScreen";


function App() {
  return (
    <Router>
    <Header></Header>
    <Container>
      <Routes>
        <Route path="/" element={<Home></Home>} exact></Route>
        <Route path="/signin"   element={<LoginScreen></LoginScreen>}  exact></Route>
        <Route path="/register"   element={<RegisterScreen></RegisterScreen>}  exact></Route>
        <Route path="/profile"   element={<ProfileScreen></ProfileScreen>}  exact></Route>
        <Route path="/product/:id"   element={<ProductScreen></ProductScreen>}  exact></Route>
        <Route path="/cart/:id"  element={<CartScreen></CartScreen>} exact />
        <Route path="/shipping"  element={<ShoppingScreen></ShoppingScreen>} exact />
      </Routes>
    </Container>
    <Footer></Footer>
    </Router>
  );
}

export default App;