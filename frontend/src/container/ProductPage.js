import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { fetchProduct, createProductReview } from '../redux/actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { REVIEW_CREATE_RESET } from '../redux/actionTypes/productActionTypes'


const ProductPage = props => {

    const productId = props.match.params.id

    const [ qty , setQty ] = useState(1);
    const [ reviewRating , setRating ] = useState(0);
    const [ reviewComment , setComment ] = useState('');

    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.productDetail)
    const { error, loading, product } = productDetail


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin

    const reviewCreate = useSelector(state => state.reviewCreate)
    const { error : reviewCreateError, success : reviewCreateSuccess } = reviewCreate

    useEffect(() => {

        if(reviewCreateSuccess){
            alert('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({ type : REVIEW_CREATE_RESET})
        }
       
        dispatch(fetchProduct(productId))

    }, [dispatch, productId, reviewCreateSuccess])

    const { image, name, rating, numReviews, price, description, countInStock, reviews } = product

    const addToCartHanlder = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    const submitHandler = event => {
        event.preventDefault()
        dispatch(createProductReview(productId, { rating : reviewRating, comments :  reviewComment}))
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
                    <Row>
                        <Col md={6} className='mt-5'>
                            <h2>Reviews</h2>
                            {
                                reviews && reviews.length === 0 && <Message>No review </Message>
                            }
                            <ListGroup variant='flush'>
                                {
                                    reviews && reviews.map (review => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} />
                                            <p>{review.createdAt.substring(0,10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))
                                }
                                <ListGroup.Item>
                                    <h2>Write a customer review</h2>
                                    { reviewCreateError && <Message variant='danger'>{reviewCreateError}</Message>}
                                    {
                                        userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control as='select' value={reviewRating} onChange={e => setRating(e.target.value)}>
                                                        <option> Select rating</option>
                                                        <option value="1">1 -Poor</option>
                                                        <option value="2">2 - Fair</option>
                                                        <option value="3">3 - Good</option>
                                                        <option value="4">4 - Very Good</option>
                                                        <option value="5">5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control as='textarea' row='3' value={reviewComment} onChange={
                                                        e => setComment(e.target.value)
                                                    }></Form.Control>
                                                </Form.Group>
                                                <Button type='submit' variant='primary'>Submit</Button>
                                            </Form>
                                        ) : 
                                        <Message>
                                            Please <Link to='/login'>Sign in </Link> to write a review
                                        </Message>
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
    
                
            }
        </>
    )
}

export default ProductPage
