import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader'
import { getUserDetail, updateUserProfil } from '../redux/actions/userActions';
import FormContainer from '../components/Form';
import { getMyOrders } from '../redux/actions/orderActions';


const ProfilePage = ({location, history}) => {

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error , loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { success } = userUpdate

    const ordersMyList = useSelector(state => state.ordersMyList)
    const { error : errorOrderList , loading : loadingOrderList, orders } = ordersMyList

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ message, setMessage] = useState(null);

    useEffect(() => {
        if(!userInfo){
            history.push('/login');
        }else{
            if(!user.name){
                dispatch(getUserDetail('profile'))
                dispatch(getMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user ])

    const submitHandler = event => {
        event.preventDefault();
        if(password !== confirmPassword){
            setMessage('Password does not match')
        }else{
            dispatch(updateUserProfil({id : user._id, name, email, password}))
        }
    }

    return (
        <Row className="mt-5">
            <Col md={4}>
            <FormContainer>
           <h3>My Profile</h3>
            { message &&  <Message variant="danger">{message}</Message>}
            { error &&  <Message variant="danger">{ error }</Message>}
            { success &&  <Message variant="success">Profil Update</Message>}
            { loading &&  <Loader/> }
            <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Your name</Form.Label>
                        <Form.Control type='text' placeholder='enter your name' value={name} onChange={event => setName(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type='email' placeholder='enter email' value={email} onChange={event => setEmail(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='enter password' value={password} onChange={event => setPassword(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='confirm password' value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update </Button>
                </Form>
            </FormContainer>
            </Col>
            <Col md={8}>
                <h2>My Orders</h2>
                { errorOrderList &&  <Message variant="danger">{errorOrderList}</Message> }
                
                {
                    
                    loadingOrderList ? <Loader />  :
                    (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0,10)}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.isPaid ? order.createdAt.substring(0,10) : (<i className="fas fa-times" style={{color:'red'}}></i>)}</td>
                                            <td>{order.isDelivered ? order.createdAt.substring(0,10) : (<i className="fas fa-times" style={{color:'red'}}></i>)}</td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button variant="light" className="btn-sm">Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    )) 
                                } 
                            </tbody>
                        </Table>
                    )
                }
            </Col>
        </Row>
    )
}

export default ProfilePage
