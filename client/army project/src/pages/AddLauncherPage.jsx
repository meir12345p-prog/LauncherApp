import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import './AddLauncher.css'

function AddLauncherPage() {

    const [name , setName] = useState('')
    const [rocketType , setRocketType] = useState('')
    const [latitude , setLatitude] = useState(null)
    const [longitude , setLongitude] = useState(null)
    const [city , setCity] = useState('')
    const [destroyed , setDestroyed] = useState('')
    const [error , setError] = useState('')
    const [success , setSuccess] = useState('')
    
    const navigate = useNavigate()
    async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')


    try{
        const token = localStorage.getItem('token')
        const data = await axios.post('http://localhost:3019/api/launchers' ,{
            city,
            rocketType,
            latitude,
            longitude,
            name,
            destroyed
        },{headers:{Authorization:`Bearer ${token}`}})
        console.log(data.data.message);
        setSuccess(data.data.message)
        

    }catch(err){
        console.log(err);
    const error = new AxiosError (err)
    setError(error.response.data.error || 'faild to add launcher')
    }
        
    }
            async function userInfo(event) {
         event.preventDefault()

         try{
            const token = localStorage.getItem('token')
            const res = await axios.get('http://localhost:3019/api/auth/getUser',{
            headers: {Authorization :`Bearer ${token}` }
        })
            const {username , user_type} = res.data
            console.log(res.data);
            
            alert(`you are ${username} and your user type is ${user_type}`)
         }catch(err){
            console.log(err);    
         }
    } 
        function handleClick() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
    }
          function HomePage() {
        navigate('/api/launchers')
    }

   

  return (
    <section>
    <nav className='nav'>
            <h1>Add launcher Page</h1>
           <div>
                   <button onClick={HomePage}>Home Page</button>
                   <button onClick={userInfo}>user info</button>
                   <Link to={'/'}><button onClick={handleClick}>logout</button></Link>
             </div>
        </nav>
    <div className='add-container'>
        
        
        <form className='create-card' onSubmit={handleSubmit}>
            <div className='input'>
                <label >city:</label>
                <input type="text" required placeholder='enter city' onChange={(e) => setCity(e.target.value)} />
            </div>
             <div className='input'>
                <label>rocketType:</label>
                <select onChange={(e) => setRocketType(e.target.value)}>
                    <option value="" disabled>select rocketType</option>
                    <option value="Shahab3">Shahab3</option>
                    <option value="Fetah110">Fetah110</option>
                    <option value="Radwan">Radwan</option>
                    <option value="Kheibar">Kheibar</option>
                </select>
            </div>
             <div  className='input'>
                <label>destroyed :</label>
                <select onChange={(e) => setDestroyed(e.target.value)}>
                    <option value="" disabled>select destroyed</option>
                    <option value="true">destroyed</option>
                    <option value="false">Not destroyed</option>
                </select> 
            </div>
             <div className='input'>
                <label>latitude:</label>
                <input type="number" required placeholder='enter latitude'onChange={(e) => setLatitude(e.target.value)} />
            </div>
             <div className='input'>
                <label>latitude:</label>
                <input type="number" required placeholder='enter latitude' onChange={(e) => setLongitude(e.target.value)} />
            </div>
             <div className='input'>
                <label>name:</label>
                <input type="text" required placeholder='enter name' onChange={(e) => setName(e.target.value)} />
            </div>
            <button type='submit' className='btn'>Create Launcher</button>
        </form>
        {error && (<div >{error}</div>)}
        {success && (<div className='flag'>{success}</div>)}
      
    </div>
</section>
  )
}

export default AddLauncherPage