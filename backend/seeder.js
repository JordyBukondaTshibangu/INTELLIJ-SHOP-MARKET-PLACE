import mongoose from 'mongoose';
import connectionToDB from './config/database.js';
import User from './models/user.js'
import Product from './models/product.js'
import Order from './models/order.js'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'

dotenv.config();

connectionToDB();

const importData = async() => {
    try {
    
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
    
        const createdUsers = await User.insertMany(users);
        const admin = createdUsers[0]._id;
    
        const sampleProducts = products.map(product => {
            return {
                ...product,
                user : admin
            }
        })
        await Product.insertMany(sampleProducts);
        console.log('Data imported ');
        process.exit()
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}


const destroytData = async() => {
    try {
    
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
    
        console.log('Data destroyed ');
        process.exit()
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
} 

if(process.argv[2] === 'd'){ destroytData( )}
else { importData()}


