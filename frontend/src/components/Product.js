import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
    const { name, image, numReviews, rating, price, _id } = product 
    return (
        <Card style={{ width: '16rem' }} className="my-3 p-2 rounded">
           <Link to={`products/${_id}`}>
            <Card.Img variant="top" src={image} />   
           </Link>
            <Card.Body>
                <Link to={`products/${_id}`}>
                    <Card.Title>{name}</Card.Title>
               </Link>
                <Card.Text>
                    <Rating 
                        rating={rating} 
                        numReviews={numReviews}
                        color="#f8e825"
                     />
                </Card.Text>
                <Card.Text as="h5">R{price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
