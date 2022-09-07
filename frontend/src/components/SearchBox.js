import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  return (
    <div style={{display:"flex",gap:"10px"}}  >
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value.trim())}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <a   style={{textDecoration:"none",backgroundColor:"#2c972cc9",color:"white" ,textAlign:"center",border:" 1px white solid"}} href ={`/search/${keyword}`}type='submit' variant='outline-success' className='p-2'>
        Search
      </a>
    </div>
  )
}

export default SearchBox
