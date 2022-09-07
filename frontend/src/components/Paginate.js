import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <div style={{display:"flex",gap:"10px"}}>
        {[...Array(pages).keys()].map((x) => (
          <a 
          style={{textDecoration:'none'}}
            key={x + 1}
            href={  
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            {/* <Pagination.Item as={<p></p>} active={x + 1 === page}>{x + 1}</Pagination.Item> */}
            <p style={x+1===page?{backgroundColor:"black",color:"white",padding:"5px"}:{backgroundColor:"white",color:"black",padding:"5px"}}>{x+1}</p>
       
          </a>
        ))}
      </div>
    )
  )
}

export default Paginate
