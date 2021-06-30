import jwt from 'jsonwebtoken';
import User from '../models/user.js'

export const validateToken = async (req, res, next) => {

    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
             token = req.headers.authorization.split(' ')[1]
             const decoded = await jwt.verify(token, process.env.JWT_SECRET)
             
             req.user = await User.findById(decoded._id).select('-password')

        } catch (error) {
            res.status(401).json({
                message : 'Unauthorized, Invalid token'
            })
        }
    }
    if(!token){
        res.status(401).json({
            message : 'No Authorized, No Token'
        })
    }
    next()
}

export const admin = (req, res,next) => {
    if(req.user && req.user.isAdmin){
        next()
    } else {
        res.status(401).json({ message : " Not Authorized as an Admin"})
        throw new Error ('Not Authorized as Admin')
    }
}