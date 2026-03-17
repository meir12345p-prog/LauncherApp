import jwt from 'jsonwebtoken'
import 'dotenv/config'
export default function authMiddleWare(req , res , next) {

        const authHeader = req.headers.authoriztion

        if(!authHeader || !authHeader.startWhit('Bearer')){
            return res.status(404).json({error : 'user not authorezition'})
        }

        const token = authHeader.split(" ")[1]


        try{
            const payload = jwt.verify(token , process.env.SECRET_KEY)
            if(!payload){
                return res.status(404).json({error : 'invailed token'})
            }
            req.payload = payload

            next()
        }catch(err){
            return res.status(404).json({error : 'invailed token'})
        }
    
}

