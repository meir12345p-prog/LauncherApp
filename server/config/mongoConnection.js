import mongoose from "mongoose";
import 'dotenv/config'

const MONGO_URI = process.env.URI

export const connect = async () =>{
    try{
        await mongoose.connect(MONGO_URI , {
            dbName : 'army'
        })
        console.log('database connected');
        return true
        
    }catch(err){
        console.log(err);
        return false
        
    }
}