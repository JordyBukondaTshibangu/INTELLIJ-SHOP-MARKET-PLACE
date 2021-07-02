import React from 'react'
import { Container } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './container/HomePage'
import ProductPage from './container/ProductPage'
import CartPage from './container/CartPage'
import LoginPage from './container/LoginPage'
import RegisterPage from './container/RegisterPage'
import ProfilePage from './container/ProfilePage'
import ShippingPage from './container/ShippingPage'
import PaymentMethodPage from './container/PayementPage'
import PlaceOrderPage from './container/PlaceOrderPage'
import OrderPage from './container/OrderPage'
import UserListPage from './container/UserListPage'
import UserEditPage from './container/UserEditPage'
import ProductListPage from './container/ProductListPage'


const App = () => {
	return (
		<div>
			<Header />
			<main className="py-4">
				<Container>
					<Route path="/" exact component={HomePage} />
					<Route path="/login" exact component={LoginPage} />
					<Route path="/register" exact component={RegisterPage} />
					<Route path="/profile" exact component={ProfilePage} />
					<Route path="/shipping" exact component={ShippingPage} />
					<Route path="/payment" exact component={PaymentMethodPage} />
					<Route path="/placeorder" exact component={PlaceOrderPage} />
					<Route path="/order/:id" exact component={OrderPage} />
					<Route path="/products/:id" exact component={ProductPage} />
					<Route path="/cart/:id" component={CartPage} />

					<Route path="/admin/product-list" exact component={ProductListPage} />
					<Route path="/admin/user-list" exact component={UserListPage} />
					<Route path="/admin/user/:id/edit" exact component={UserEditPage} />
				</Container>
			</main>
			<Footer />
		</div>
	)
}

export default App
