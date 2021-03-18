import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader'
import { registerUser } from '../redux/actions/userActions';
import FormContainer from '../components/Form';


const RegisterPage = ({location, history}) => {

    const redirect = location.search ? location.search.split('=')[1] : '/' 

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { error , loading, userInfo } = userRegister

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ message, setMessage] = useState(null);

    useEffect(() => {
        if(!userInfo){
            history.push(redirect);
        }
    }, [redirect, history, userInfo ])

    const submitHandler = event => {
        event.preventDefault();
        if(password !== confirmPassword){
            setMessage('Password does not match')
        }else{
            dispatch(registerUser(name, email, password))
        }
    }

    return (
        <FormContainer>
           <h1>Sign up</h1>
            { message &&  <Message variant="danger">{message}</Message>}
            { error &&  <Message variant="danger">{ error }</Message>}
            { loading &&  <Loader/> }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
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
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an account ? <Link to={ redirect ? `/login?login=${redirect}` : '/login'}> LogIn</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterPage
