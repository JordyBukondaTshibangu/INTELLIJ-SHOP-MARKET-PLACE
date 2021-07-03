import Order from '../models/order.js';

export const addOrderItems = async(req,res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400).json({
            message : 'An Error occurebd'
        })
    }else{
        const order = new Order({
            user : req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save()

        res.status(202).json({ order : createdOrder})
    }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message : 'An error occured'
        })
    }
}
export const getOrderById = async(req, res) => {
    try {
        const orderId = req.params.id
        const order  = await await Order.findById(orderId).populate('user', 'name email')
        if(order){
            res.status(200).json({ order})
        }else{
            res.status(404).json({
                message : 'Order not found'
            })
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}
export const updateOrderToPaid = async(req, res) => {
    try {
        const orderId = req.params.id
        const order  = await await Order.findById(orderId)
        if(order){
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id : req.body.id,
                status : req.body.status,
                update_time : req.body.update_time,
                email_address : req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.status(200).json({ updatedOrder})
            
        }else{
            res.status(404).json({
                message : 'Order not found'
            })
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}
export const updateOrderToDelivered = async(req, res) => {
    try {
        const orderId = req.params.id
        const order  = await await Order.findById(orderId)
        if(order){
            order.isDelivered = true
            order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        res.status(200).json({ updatedOrder})
            
        }else{
            res.status(404).json({
                message : 'Order not found'
            })
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}
export const getMyOrders = async(req, res) => {
    try {
        const orders  = await await Order.find({user : req.user._id})
        res.status(200).json({ orders})
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Admin operations 

export const getOrders = async(req, res) => {
    try {
        const orders  = await await Order.find({}).populate('user' , 'name id')
        res.status(200).json({ orders})
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}