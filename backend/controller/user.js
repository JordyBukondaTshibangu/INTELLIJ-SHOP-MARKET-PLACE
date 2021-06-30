import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const register = async (req, res) => {
   try {
       
        const { name, email, password } = req.body

        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({
                message : " User already exists"
            })
        }
        
        const user = await User.create({
            name, email, password : bcrypt.hashSync(password, 8)
        })


        if(user){
            res.status(201).json({
                _id : user._id,
                name : user.name,
                email : user.email,
                password : user.password,
                isAdmin : user.isAdmin,
                token : jwt.sign({
                    _id : user._id,
                }, process.env.JWT_SECRET , { expiresIn: '30d' }) 
            })
        }else{
            res.status(400).json({
                message : 'Invalid user data'
            })
        }
   } catch (error) {
       res.status(500).json({
           message : 'An error occured'
       })
   }
}
export const login = async (req,res) => {

    try {
        
        const { email, password } = req.body
        const  user = await User.findOne({email})

        if(!user){
        return  res.status(404).json({
                message : "No User Found"
            })
        }
        const result = await bcrypt.compare(password, user.password)

        if(!result){
            return res.status(401).json({
                message : "Invalid email or password "
            })
        }

        return res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : jwt.sign({
                _id : user._id,
            }, process.env.JWT_SECRET , { expiresIn: '30d' }) 
        })
    } catch (error) {
        res.status(500).json({
            message : 'An error occured'
        })
    }
}
export const getUserProfile = async (req, res) => {

    try {
        
        const user = await User.findById(req.user._id)

        if(user){
            res.status(200).json({
                _id : user._id,
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
            })
        }else {
            res.status(404).json({
                mesage : "User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message : 'An error occured'
        })
    }
}
export const updateUserProfile = async (req, res) => {

    try {
        
        const user = await User.findById(req.user._id)

        if(!user){
            return res.status(404).json({
                mesage : "User not found"
            })
        }

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 8)
        }

        const updatedUser = await user.save();

        return res.status(200).json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin,
            token : jwt.sign({
                _id : updatedUser._id,
            }, process.env.JWT_SECRET , { expiresIn: '30d' }) 
        })
        
    } catch (error) {
        res.status(500).json({
            message : 'An error occured'
        })
    }
}


/* ADMIN CONTROLLERS */

export const getAllUsers = async (req, res) => {

    try {
        
        const users = await User.find()

        if(users.length < 1){
            res.status(404).json({
                mesage : "User not found"
            })
        }else {
            res.status(200).json(users)
        }
    } catch (error) {
        res.status(500).json({
            message : 'An error occured'
        })
    }
}
