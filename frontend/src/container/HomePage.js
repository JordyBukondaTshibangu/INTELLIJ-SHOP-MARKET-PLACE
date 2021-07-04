import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { fetchProducts } from '../redux/actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomePage = ({match}) => {

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);

    const { loading, error, products, pages , page } = productList;
    
    useEffect(() => {
        
        dispatch(fetchProducts(keyword, pageNumber));
        
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Helmet>
                <title> Welcome IntelliJ Shop | Home </title>
                <meta name='description' content='We bring the best products to your home'/>
                <meta name='keywords' content='electronics, buy electronics, cheap electronics'/>
            </Helmet>
            {
                !keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>
            }
            <h2 className='mt-5'>Latest products</h2>
            {
                loading ? 
                    <Loader/> : error ? 
                    <Message variant="danger" children={error} /> : 
                    (
                    <>
                        <Row>
                            {
                                products.map(product => (
                                    <Col sm={3} md={6} lg={4} xl={3} key={product._id}>
                                        <Product product={product}/>
                                    </Col>
                                ))
                            }
                        </Row>  
                        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                    </>
                    )
            }
        </>
    )
}

export default HomePage
