import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader'
import FormContainer from '../components/Form';
import { updateUserAdmin } from '../redux/actions/userActions';


const UserEditPage = ({location, match}) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const userId = match.params.id
    const { userName, userEmail, userIsAdmin } = location.state

    const [ name, setName ] = useState(userName);
    const [ email, setEmail ] = useState(userEmail);
    const [ isAdmin, setIsAdmin] = useState(userIsAdmin);

    const userDetails = useSelector(state => state.userDetails)
    const { error , loading } = userDetails

    const userUpdateAdmin = useSelector(state => state.userUpdateAdmin)
    const { user : updatedUser, loading : updateLoading, error : updateError } = userUpdateAdmin

    console.log(userUpdateAdmin)

    useEffect(() => {
        if(updatedUser){
            if(updatedUser.name){
                history.push('/admin/user-list')
            }
        }

    }, [updatedUser, history])

    const submitHandler = event => {
        event.preventDefault();
        dispatch(updateUserAdmin({ name, email, isAdmin }, userId))
    }

    return (
        <>
            <Link to='/admin/user-list'>Go Back</Link>
            <FormContainer>
                <h1>User Edit Screen</h1>
                    { updateLoading && <Loader />}
                    { updateError && <Message variant="danger">{ error }</Message>}
                    { error &&  <Message variant="danger">{ error }</Message>}
                    { loading ? <Loader/> : 
                        (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Your name</Form.Label>
                                <Form.Control type='text' placeholder='enter your name' value={name} onChange={event => setName(event.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type='email' placeholder='enter email' value={email} onChange={event => setEmail(event.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='isAdmin'>
                                <Form.Label>Password</Form.Label>
                                <Form.Check type='checkbox' label="is Admin" checked={isAdmin} onChange={event => setIsAdmin(event.target.checked)}></Form.Check>
                            </Form.Group>
                            <Button type='submit' variant='primary'>Update </Button>
                        </Form>
                        )
                    } 
                   
                </FormContainer>
        </>
       
    )
}

export default UserEditPage
