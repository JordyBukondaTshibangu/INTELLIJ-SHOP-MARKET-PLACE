import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Col, Row } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader'
import { createProduct, deleteProduct, fetchProducts } from '../redux/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../redux/actionTypes/productActionTypes';
import Paginate from '../components/Paginate';


const ProductListPage = ({ history, match }) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productCreate = useSelector(state => state.productCreate)
    const { loading : createLoading, error : createError, product, success : createSuccess } = productCreate

    const productDelete = useSelector(state => state.productDelete)
    const { loading : deleteLoading, error : errorDelete, success } = productDelete

    useEffect(() => {
        dispatch({ type : PRODUCT_CREATE_RESET})
        if(userInfo && userInfo.isAdmin){
            dispatch(fetchProducts())
        } else {
            history.push('/login')
        }

        if(createSuccess){
            history.push(`/admin/product/${product._id}/edit`)
        } else {
            dispatch(fetchProducts('', pageNumber))
        }
    },[dispatch, history, userInfo, success, product, createSuccess, pageNumber])

    const handleCreateProduct = () => {
        dispatch(createProduct())
    }

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
                    <Button className="my-3" onClick={handleCreateProduct}>
                        <i className="fas fa-plus"></i>
                         Create Product
                    </Button>
                </Col>
            </Row>
            { createLoading && <Loader />}
            { createError && <Message variant="danger">{error}</Message>}
            { deleteLoading && <Loader />}
            { errorDelete && <Message variant="danger">{error}</Message>}
            
            {

                loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                (
                    <>
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
                        <Paginate pages={pages} page={page} isAdmin={true}/>
                    </>
                )
            }
           
        </>
    )
}

export default ProductListPage
