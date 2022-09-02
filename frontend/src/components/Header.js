import React from "react";
import {Link} from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
import {Container,Navbar,Nav,Row, NavDropdown} from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import {logout} from "../actions/userActions";
export default function Header(){
    const dispatch=useDispatch();
    const userLogin=useSelector(state=>state.userLoginReducer)
    const {userInfo} =userLogin;
    const  logoutHandler=()=>{
        console.log("logout")
        dispatch(logout())
    }
    return (
         <Navbar  bg="dark" variant="dark" expand="lg" >
        <Container >
            <Navbar.Brand href="/">Pro-Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav  className="ml-auto" style={{"flexGrow":0}}>
            <Nav.Link href="/cart">
                <Nav.Item>
                    <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Item>
            </Nav.Link>
            {userInfo?<NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile  </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>:
                <Nav.Link href="/signin">
                <Nav.Item > 
                    <i className="fas fa-user"></i>Signin
                </Nav.Item>
                </Nav.Link>
            }
            {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            
            </Nav>
            </Navbar.Collapse>
        </Container>

    </Navbar>
    );
}