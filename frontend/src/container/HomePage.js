import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { fetchProducts } from '../redux/actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomePage = () => {

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);

    const { loading, error, products } = productList;
    
    useEffect(() => {
        
        dispatch(fetchProducts());
        
    }, [dispatch])

    return (
        <>
            <h2>Latest products</h2>
            {
                loading ? 
                    <Loader/> : error ? 
                    <Message variant="danger" children={error} /> : 
                    <Row>
                        {
                            products.map(product => (
                                <Col sm={3} md={6} lg={4} xl={3} key={product._id}>
                                    <Product product={product}/>
                                </Col>
                            ))
                        }
                    </Row>  
            }
        </>
    )
}

export default HomePage
