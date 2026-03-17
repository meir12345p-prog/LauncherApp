import express from 'express'
import usersData from '../model/usersModel.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import authMiddleWare from '../middleware/authMiddleWare.js'

const auth = express.Router()

auth.post('/' , async (req , res) =>{
    
    try{
    const {username , password} = req.body
    if(!username ||!password){
        return res.status(400).json({error:'missing username or password'})       
    }

    const user = await usersData.findOne({username , password})
    if(!user){
        return res.status(400).json({error:'user not found'})
    }
        user.last_login = new Date().toISOString()
        await user.save()

    const token = jwt.sign({
        username : user.username,
        email : user.email,
        user_type : user.user_type,
        last_login : user.last_login

    },process.env.SECRET_KEY)

    res.status(200).json({ token : token , user : {username : username ,email : email , user_type : user_type}})

}catch(err){
    res.status(500).json({error : err})
}


})

auth.post('/register/create',authMiddleWare , async (req, res)=>{
    try{
    const {username ,password, email , user_type} = req.body

        if(!username || !password|| !email || !user_type){
            return res.status(400).json({error:'missing fields'})
        }

        const user = await usersData.create({
                    username,
                    password,
                    email,
                    user_type,
                    last_login : new Date().toISOString()
                 })

        res.status(200).json({message: 'user created successfully' , user : {username : username ,email : email , user_type : user_type}})

    }catch(err){
    res.status(500).json({error : err})
}
})

auth.delete('/register/delete/:id',authMiddleWare , async (req , res) =>{
    try{
        const { id} = req.params
        const deleteUser = await usersData.findByIdAndDelete(id)
        res.status(201).json({message : `user deleted successfully` , launter : deleteLauncher })
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

auth.put('/register/update',authMiddleWare , async (req , res) =>{
    try{
    
        const {username , password , email , user_type} = req.body        
        if(!username && !password && !email && !user_type){
            return res.status(400).json({error: 'not input to change'})
        }
        if(username){
            const user = await usersData.findById(id)
            user.username = username
            await user.save()

        }
        if(password){
            const user = await usersData.findById(id)
            user.password = password
            await user.save()
        }
        if(email){
            const user = await usersData.findById(id)
            user.email = email
            await user.save()
        }
        if(user_type){
            const user = await usersData.findById(id)
            user.user_type = user_type
            await user.save()
        }
        const user = await usersData.findById(id)
        
        res.status(201).json({message : `update successful refresh for changes` , user : user })
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

auth.get('/getUser',authMiddleWare , async (req , res) =>{
    try{
        const {username , user_type} = req.payload
        res.status(201).json({username : username , user_type : user_type})

        
    }catch(err){
        res.status(500).json({error:err.message})
    }
})



export default auth