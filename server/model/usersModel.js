import mongoose from "mongoose";

const user = new mongoose.Schema({
    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    user_type : {
        type : String,
        require : true
    },
    last_login : {
        type : Date,
        require : true
    }
})

export default mongoose.model('users' , user)   