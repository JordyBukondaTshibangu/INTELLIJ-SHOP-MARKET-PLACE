import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Col, Row } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader'
import { deleteProduct, fetchProducts } from '../redux/actions/productActions';


const ProductListPage = ({ history }) => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { loading : deleteLoading, error : errorDelete, success } = productDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(fetchProducts())
        } else {
            history.push('/login')
        }
    },[dispatch, history, userInfo, success])

    const deleteHandler = id => {
        if(window.confirm('Are you sure ? ')){
            dispatch(deleteProduct(id))
        }
    }

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3">
                        <i className="fas fa-plus"></i>
                         Create Product
                    </Button>
                </Col>
            </Row>
            { deleteLoading && <Loader />}
            { errorDelete && <Message variant="danger">{error}</Message>}
            
            {

                loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <LinkContainer to={{
                                                pathname : `/admin/product/${product._id}/edit`,
                                                state : { product }
                                            }}>
                                                <Button variant="light" className="btn-sm">
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
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

export default ProductListPage
