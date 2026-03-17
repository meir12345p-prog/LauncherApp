import { create } from "zustand";
import axios from "axios";

const AuthUserStore = create((set)=>({
    token : null,
    user : null,
    error : null,

    login : async (username , password) => {

        try{
             const res = await axios.post('http://localhost:3019/api/auth/login',{
                username,
                password
             })
    
             localStorage.setItem('token' , res.data.token)
             localStorage.setItem('user',JSON.stringify(res.data.user))
             set({user : res.data.user})
             set({token : res.data.token})
             return true
        }catch(err){
            const error = err.respose?.data?.error || 'login feild'
            console.log(err);
            
            set({error : error})
            return false
            
        }

    },

    logout : () => {
        localStorage.removeItem('token')
        set({token:null , token:null})
    }

}))

export default AuthUserStore