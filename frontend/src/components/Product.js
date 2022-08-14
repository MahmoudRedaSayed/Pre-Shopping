import React from 'react'
import { useEffect,useState } from 'react';
import { Link ,Router} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ Product }) => {
  
  return (
    <Card className='my-3 p-3 rounded'>

      <Link to={`/product/${Product._id}`}>
        <Card.Img src={Product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${Product._id}`}>
          <Card.Title as='div'>
            <strong>{Product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={Product.rating}
            text={`${Product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${Product.price}</Card.Text>
      </Card.Body>
    </Card>

  )
}

export default Product
