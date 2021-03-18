import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/Form';
import { savePaymentMethod } from '../redux/actions/cartAtcions'
import CheckoutSteps from '../components/CheckoutSteps'
 
const ShippingPage = ({ history}) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart 

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [ paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = event => {
            event.preventDefault()
            dispatch(savePaymentMethod(paymentMethod))
            history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                   <Form.Label as='legent'>Select Method</Form.Label>
                   <Col>
                    <Form.Check 
                        type="radio" 
                        label="Paypal or Credit Card" 
                        id="PayPal" name="PaymentMethod" 
                        value="Paypal" 
                        checked
                        onChange={ event => setPaymentMethod(event.target.value)}
                        >
                    </Form.Check>
                    <Form.Check 
                        type="radio" 
                        label="Stripe" 
                        id="Stripe" name="PaymentMethod" 
                        value="Stripe" 
                        onChange={ event => setPaymentMethod(event.target.value)}
                        >
                    </Form.Check>
                </Col>
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingPage
