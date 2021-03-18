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