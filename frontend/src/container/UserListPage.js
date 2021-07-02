import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader'
import { getUsersList , deleteUser} from '../redux/actions/userActions';


const UserListPage = ({ history }) => {

    const dispatch = useDispatch()

    const usersList = useSelector(state => state.usersList)
    const { loading, error, users } = usersList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(getUsersList())
        } else {
            history.push('/login')
        }
    },[dispatch, history, userInfo, successDelete])

    const deleteHandler = id => {
        if(window.confirm('Are you sure ? ')){
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
            <h1>Users</h1>
            {
                loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td><a href={`mailTo : ${user.email}`}>{user.email}</a></td>
                                        <td>{
                                            user.isAdmin ? 
                                            <i className="fas fa-check" style={{color : 'green'}}></i> : 
                                            <i className="fas fa-times" style={{color : 'red'}}></i>
                                        }</td>
                                        <td>
                                            <LinkContainer to={{
                                                pathname : `/admin/user/${user._id}/edit`,
                                                state : {
                                                    userName : user.name,
                                                    userEmail : user.email,
                                                    userIsAdmin : user.isAdmin,
                                                }
                                            }}>
                                                <Button variant="light" className="btn-sm">
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                )
            }
           
        </>
    )
}

export default UserListPage
