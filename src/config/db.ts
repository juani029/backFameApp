import mongoose, { ConnectOptions } from "mongoose";

const connectDB= async():Promise<void>=>{
    try {
        const connection= await mongoose.connect(<string>process.env.MONGO_URI,{
                useNewUrlParser: true,
                useUnifiedTopology: true  
        } as ConnectOptions)
        const url=`${connection.connection.host}:${connection.connection.port}`
        console.log(`MongoDB Conectado en ${url} `)
    } catch (error) {
        console.log(error)
    }
}

export default connectDB