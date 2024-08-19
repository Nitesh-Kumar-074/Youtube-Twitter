import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'
import {ApiError} from '../utils/ApiError.js'

const connectDB = async function(){
       try {
              const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
              // console.log("MONGODB connected !!!")
       } catch (error) {
              console.log("Error in mongodb connection")     
              throw new ApiError(500,"Something went wrong while connecting with database") 
       }
}


export { connectDB }