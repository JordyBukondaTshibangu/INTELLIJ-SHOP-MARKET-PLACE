import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/Form'
import { fetchProduct, updateProduct } from '../redux/actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../redux/actionTypes/productActionTypes'

const ProductEditPage = ({ location, match }) => {
	const dispatch = useDispatch()
	const history = useHistory()

	const productId = match.params.id

	const productDetail = useSelector((state) => state.productDetail)
	const { error, loading, product } = productDetail

	const productUpdate = useSelector((state) => state.productUpdate)
	const { error: updateError, loading: updateLoading, success } = productUpdate

	const [name, setName] = useState()
	const [price, setPrice] = useState()
	const [image, setImage] = useState()
	const [brand, setBrand] = useState()
	const [category, setCategory] = useState()
	const [description, setDescription] = useState()
	const [countInStock, setCountInStock] = useState()
	const [uploading, setUploading] = useState(false)

	useEffect(() => {
		if (!product.name || product._id !== productId) {
			dispatch(fetchProduct(productId))
		} else {
			setName(product.name)
			setPrice(product.price)
			setImage(product.image)
			setBrand(product.brand)
			setCategory(product.category)
			setCountInStock(product.countInStock)
			setDescription(product.description)
		}

		if (success) {
			dispatch({ type: PRODUCT_UPDATE_RESET })

			history.push('/admin/product-list')
		}
	}, [dispatch, productId, product, success, history])

	const uploadHandler = async (event) => {
		const file = event.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
			const { data } = await axios.post('http://localhost:5000/api/upload', formData, config)

			setImage(data)
			setUploading(false)
		} catch (error) {
			console.log(error)
			setUploading(false)
		}
	}
	const submitHandler = (event) => {
		event.preventDefault()
		dispatch(
			updateProduct(
				{ name, price, image, brand, category, countInStock, description },
				productId
			)
		)
	}

	return (
		<>
			<Link to='/admin/product-list'>Go Back</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{updateLoading && <Loader />}
				{updateError && <Message variant='danger'>{error}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{loading ? (
					<Loader />
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your name'
								value={name}
								onChange={(event) =>
									setName(event.target.value)
								}></Form.Control>
						</Form.Group>
						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter price'
								value={price}
								onChange={(event) =>
									setPrice(event.target.value)
								}></Form.Control>
						</Form.Group>
						<Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter image url'
								value={image}
								onChange={(event) =>
									setImage(event.target.value)
								}></Form.Control>
							<Form.File
								id='image-file'
								label='Choose file'
								custom
								onChange={uploadHandler}>
							</Form.File>
                            {uploading && <Loader />}
						</Form.Group>
						<Form.Group controlId='brand'>
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={brand}
								onChange={(event) =>
									setBrand(event.target.value)
								}></Form.Control>
						</Form.Group>
						<Form.Group controlId='category'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter category'
								value={category}
								onChange={(event) =>
									setCategory(event.target.value)
								}></Form.Control>
						</Form.Group>
						<Form.Group controlId='countInStock'>
							<Form.Label>Count in stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter countInStock'
								value={countInStock}
								onChange={(event) =>
									setCountInStock(event.target.value)
								}></Form.Control>
						</Form.Group>
						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter description'
								value={description}
								onChange={(event) =>
									setDescription(event.target.value)
								}></Form.Control>
						</Form.Group>
						<Button type='submit' variant='primary'>
							Update{' '}
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default ProductEditPage
