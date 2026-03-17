import express from 'express'
import launchersData from '../model/launchersModel.js'
import authMiddleWare from '../middleware/authMiddleWare.js'
const router = express.Router()


router.post('/',authMiddleWare , async (req , res) =>{
    try{
         const {city , rocketType , latitude , longitude , name ,destroyed} = req.body
         if(!city || !rocketType || !latitude || !longitude ||!name ||!destroyed){
            return res.status(400).json({error : 'missing input'})
         }
         if(!typeof city === String|| !typeof rocketType === String || !typeof name ===String ){
           return  res.status(400).json({error : 'name city and rocketType need to be string'})

         }

         if(!typeof latitude === Number || !typeof longitude === Number){
           return res.status(400).json({error:'latitude and longitude need to be numbers'})
         }

         if(!typeof destroyed === Boolean){
              return  res.status(400).json({error:'latitude and longitude need to be numbers'})
         }

         const launcher = await launchersData.create({
            city,
            rocketType,
            latitude,
            longitude,
            name,
            destroyed
         })

         res.status(200).json({message : 'rocket created successfully' , roket : launcher})
    
    }catch(err){
        res.status(500).json({error : err.message})
    }
    
})

router.get('/',authMiddleWare , async (req , res) =>{
    try{

        const allLaunchers = await launchersData.find({})
        res.status(201).json({launchers : allLaunchers})
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.get('/:id',authMiddleWare , async (req , res) =>{
    try{
        const {id} = req.params
        const launcher = await launchersData.findById(id)
        if(!launcher){
            return res.status(404).json({error:'launcher not found'})
        }
        res.status(201).json({launchers : launcher})
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.delete('/:id',authMiddleWare , async (req , res) =>{
    try{
        const {user_type} = req.payload
        const { id} = req.params
        if(user_type === 'air-army'){
            return res.status(401).json({error : 'u dont have authorizition to delete'})
        }
        const deleteLauncher = await launchersData.findByIdAndDelete(id)
        res.status(201).json({message : `launcher deleted successfully` , launter : deleteLauncher })
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.put('/:id',authMiddleWare , async (req , res) =>{
    try{
        const {id } = req.params
        
        const {city , rocketType , latitude , longitude , name ,destroyed} = req.body 
        console.log(req.body , id , "im here");
        
           
        if(!city && !rocketType && !latitude && !longitude && !name && !destroyed){
              console.log('im here');
            return res.status(400).json({error: 'not input to change'})
          
            
        }
        if(city){
            const launcher = await launchersData.findById(id)
            launcher.city = city
            await launcher.save()

        }
        if(rocketType){
            const launcher = await launchersData.findById(id)
            launcher.rocketType = rocketType
            await launcher.save()
        }
        if(latitude){
            const launcher = await launchersData.findById(id)
            launcher.latitude = latitude
            await launcher.save()
        }
        if(longitude){
            const launcher = await launchersData.findById(id)
            launcher.longitude = longitude
            await launcher.save()
        }
        if(name){
            const launcher = await launchersData.findById(id)
            launcher.name = name
            await launcher.save()
        }
        if(destroyed){
            const launcher = await launchersData.findById(id)
            launcher.name = destroyed
            await launcher.save()
        }
        const launcher = await launchersData.findById(id)
        
        res.status(201).json({message : `update successful refresh for changes` , launter : launcher })
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

export default router