import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader'
import { loginUser } from '../redux/actions/userActions';
import FormContainer from '../components/Form';


const LoginPage = ({location, history}) => {

    const redirect = location.search ? location.search.split('=')[1] : '/' 

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { error , loading, userInfo } = userLogin

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect(() => {
        if(userInfo){
            history.push(redirect);
        }
    }, [redirect, history, userInfo ])

    const submitHandler = event => {
        event.preventDefault();
        dispatch(loginUser(email, password))
    }

    return (
        <FormContainer>
           <h1>Sign in</h1>
            { error &&  <Message variant="danger">{ error }</Message>}
            { loading &&  <Loader/> }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' placeholder='enter email' value={email} onChange={event => setEmail(event.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='enter password' value={password} onChange={event => setPassword(event.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer ? <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}> Register now</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginPage
