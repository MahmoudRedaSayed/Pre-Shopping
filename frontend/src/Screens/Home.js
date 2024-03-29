import React, { useEffect,useState } from 'react';
import {Row,Col} from "react-bootstrap";
import Product from "../components/Product";
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions';
import { useParams,Link } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
export default function HomeScreen(){
    const params=useParams();
    const dispatch = useDispatch();
    const keyword = params.keyword;
    const pageNumber = params.pageNumber || 1
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword,pageNumber));
    }, [dispatch]);

    return(<>
    <h1 className="text-center mt-4">the letest Products</h1>
    {!keyword ? (
        <ProductCarousel />
      ): (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
    {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
    <Row>
            {
                products.data&&products.data.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product Product={product}></Product>
                    </Col>
                ))
                
            }
    </Row>
     <Paginate
     pages={products.pages}
     page={products.page}
     keyword={keyword ? keyword : ''}
   />
   </>
      )}
    
    
    </>)
}