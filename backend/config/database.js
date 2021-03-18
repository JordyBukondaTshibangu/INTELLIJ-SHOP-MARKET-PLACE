import mongoose from 'mongoose';
 
const connectionToDB = async () => {
    try {

        const connectDB = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    
        console.log(`The Database is connected on ${connectDB.connection.host}`.bold.yellow)
        
    } catch (error) {
        console.log(`Error : ${error.message}`.red.underline)
        process.exit(1)
    }
}

export default  connectionToDB