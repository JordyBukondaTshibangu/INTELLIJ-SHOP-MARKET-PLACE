import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {  Row, Col, ListGroup, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { getOrderDetails } from '../redux/actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderPage = ({history,match}) => {

    const orderId = match.params.id

    const dispatch = useDispatch()
    
    const orderDetails = useSelector(state => state.orderDetails)

    const { order, loading, error } = orderDetails

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])

    return ( loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : 
        <>
            <h1> Order { order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shiiping</h2>
                            <p>
                                <strong>Address : </strong>
                                { order.shippingAddress.address}, { order.shippingAddress.city},
                                { order.shippingAddress.postalCode}, { order.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method : </strong>
                                Paypal
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Ordered items</h2>
                           {
                               order.orderItems.length === 0 ? <Message> order is empty </Message> : 
                               <ListGroup variant='flush'>
                                   {
                                       order.orderItems.map((item, index) => (
                                           <ListGroup.Item key={index}>
                                               <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                            <Link to={`product/${item.product}`}> {item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                       { item.qty } x ${item.price} = ${ item.qty * item.price}
                                                    </Col>
                                               </Row>
                                           </ListGroup.Item>
                                       )) 
                                   }
                               </ListGroup>
                           }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderPage
