import React from 'react'
import {  Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {  logoutUser  } from '../redux/actions/userActions'

const Header = () => {

    const dispatch = useDispatch()
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logoutUser());
    }

	return <header>
            <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
                <LinkContainer to="/">
                    <Navbar.Brand>IntelliJ-shop</Navbar.Brand> 
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <LinkContainer to="/cart">
                        <Nav.Link> <i className="fas fa-shopping-cart mr-1"></i>Cart</Nav.Link>
                    </LinkContainer>
                   {
                       userInfo ? (
                           <NavDropdown title={userInfo.name} id='username'>
                               <LinkContainer to='/profile'>
                                   <NavDropdown.Item>Profil</NavDropdown.Item>
                               </LinkContainer>
                               <NavDropdown.Item onClick={logoutHandler}>Log out</NavDropdown.Item>
                           </NavDropdown>
                       ): 
                       <LinkContainer to="/login">
                            <Nav.Link><i className="fas fa-user mr-1"></i>Sign in</Nav.Link>
                        </LinkContainer>
                   }
                   {
                       userInfo && userInfo.isAdmin && (
                        <NavDropdown title="Admin" id='admin'>
                        <LinkContainer to='/admin/user-list'>
                            <NavDropdown.Item>User List</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/products-list'>
                            <NavDropdown.Item>Product List</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orders-list'>
                            <NavDropdown.Item>Order List</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                       )
                   }
                    </Nav>
                </Navbar.Collapse>
            </Navbar> 
    </header>
}

export default Header
