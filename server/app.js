import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from './config/mongoConnection.js'
import launchersRoute from './routes/launchersRoute.js'
import auth from './routes/authRoutes.js'

const PORT = process.env.PORT


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth' , auth)
app.use('/api/launchers' , launchersRoute)


async function serverStart (){
    try{
    const connetToBd = await connect()
    if(connetToBd){
        app.listen(PORT , ()=>{
    console.log(`server running at port ${PORT}`);
    
})
    }}catch(err){
        console.log(`db not connected ` , err);
        
    }
}

serverStart()
