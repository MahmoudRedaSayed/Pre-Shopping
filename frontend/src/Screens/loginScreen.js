import React from "react";
import ReactDom from "react-dom"
import {useEffect,useState,useRef} from "react";
import { useDispatch ,useSelector} from "react-redux";
import {useLocation,useNavigate,Link} from "react-router-dom";
import {Container,Col,Form , Row , Button} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {login} from "../actions/userActions";

export default function LoginScreen(){
    const [email,setEmail] = useState(); 
    const [password,setPassword] = useState(); 

    const location =useLocation();
    const navigate=useNavigate();

    const dispatch=useDispatch();
    const isRefEmail=useRef();
    const isRefPassword=useRef();
    const userState=useSelector(state=> state.userLoginReducer)
    const {loading,userInfo,error}=userState;

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(login(email,password))
    }

    const emailHandler=()=>{
        setEmail(isRefEmail.current.value);
    }
    const passwordHandler=()=>{
        setPassword(isRefPassword.current.value);
    }

    useEffect(()=>{

        if(userInfo)
        {
            navigate("/");
        }
    }
    ,[userInfo])

    return<Container>
            <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form  onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Enter your Email</Form.Label>
                        <Form.Control type="email" placeholder="....@expamle.com" ref={isRefEmail} onChange={emailHandler}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" >
                        <Form.Label>Enter your passwod</Form.Label>
                        <Form.Control type="password" placeholder="********" ref={isRefPassword} onChange={passwordHandler}></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="m-2">signin</Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                    New Customer?{' '}
                    <Link to='/register' >
                        Register
                    </Link>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Container>
}
