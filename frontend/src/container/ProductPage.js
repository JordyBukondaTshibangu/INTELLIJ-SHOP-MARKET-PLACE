import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form  } from 'react-bootstrap'
import Rating from '../components/Rating'
import { fetchProduct } from '../redux/actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';


const ProductPage = props => {

    const productId = props.match.params.id

    const [ qty , setQty ] = useState(1);

    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.productDetail)
    const { error, loading, product } = productDetail

    useEffect(() => {
       
        dispatch(fetchProduct(productId))

    }, [dispatch, productId])

    const { image, name, rating, numReviews, price, description, countInStock } = product

    const addToCartHanlder = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }
    return (
        <>
            {
                loading ? <Loader/> : 
                error ? <Message variant="danger" children={error} /> : 
                <>
                    <Link to="/" className="btn btn-dark my-3">Back</Link>
                    <Row>
                        <Col md={6}>
                            <Image src={image} alt={name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating 
                                        rating={rating} 
                                        numReviews={numReviews} 
                                        color="#f8e825"/>
                                </ListGroup.Item>
                                <ListGroup.Item>Product Price : R{price}</ListGroup.Item>
                                <ListGroup.Item>Description : {description} </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card className="px-3 py-3" >
                                <ListGroup flush className="py-1">
                                    <Row>
                                        <Col>Price</Col>
                                        <Col><strong>{price}</strong></Col>
                                    </Row>
                                </ListGroup>
                                <ListGroup flush className="py-1">
                                    <Row>
                                        <Col>Status</Col>
                                        <Col><strong>{ countInStock > 0 ? 'In Stock' : 'Out of Stock' }</strong></Col>
                                    </Row>
                                </ListGroup>
                                {
                                    (countInStock > 0) && 
                                        <ListGroup>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control 
                                                    as="select" 
                                                    value={qty} 
                                                    onChange={ event => {
                                                    setQty(event.target.value)
                                                }}>
                                                    {[...Array(countInStock).keys()].map( x => (
                                                        <option key={x + 1} value={x+1} className="mr-2">{ x + 1 } </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup> 
                                }                                 
                                <ListGroup flush className="py-1">
                                    <Button 
                                        onClick={addToCartHanlder}
                                        type="button" 
                                        disabled={countInStock === 0} 
                                        className="rounded">Add to cart</Button>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
    
                
            }
        </>
    )
}

export default ProductPage
