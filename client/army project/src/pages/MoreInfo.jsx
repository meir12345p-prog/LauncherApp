import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import './MoreInfo.css'
function MoreInfo() {

    const [launcher , setLauncher] = useState([])
    const [name , setName] = useState('')
    const [rocketType , setRocketType] = useState('')
    const [latitude , setLatitude] = useState(null)
    const [longitude , setLongitude] = useState(null)
    const [city , setCity] = useState('')
    const [error , setError] = useState('')
    const [success , setSuccess] = useState('')

    const navigate = useNavigate()
    const {id} = useParams()
        
    useEffect(() =>{
    
            const getAllLaunchers = async () =>{
              setError(null)
              try{
              const data = await axios.get('http://localhost:3016/api/launchers')

        
              const launcher = data.data.launchers.filter((launcher)=>  launcher._id === id)
              setLauncher(launcher)
              }catch(err){
                const error = new AxiosError(err)
                setError(error.response.data.error || 'faild to get launchers')
              }
              
    
            }
    
            getAllLaunchers()
        } , [])

    async function DeleteLauncher(event) {
        event.preventDefault()
        try{
        const res = await axios.delete(`http://localhost:3016/api/launchers/${id}`)
        alert('launcher got deleted')
        navigate('/')
    }catch(err){
         const error = new AxiosError(err)
        setError(error.response.data.error || 'faild to get delete')
    }
    }
    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        setSuccess('')
    
    
        try{
            const data = await axios.put(`http://localhost:3016/api/launchers/${id}` ,{
                city,
                rocketType,
                latitude,
                longitude,
                name
            })
            setSuccess(data.data.message) 
        }catch(err){
            console.log(err);
        const error = new AxiosError (err)
        setError(error.response.data.error || 'faild to add launcher')
        }
            
        }

         function HomePage() {
        navigate('/')
    }


  return (
    <section>
    <nav className='navbar'>
        <h1>More Info Launcher</h1>
        <button onClick={HomePage}>Home Page</button>

    </nav>
    <div className='container'>
        <div className='update-card'>
            <div className='launcher-div'>
                 <h3>Name:</h3>
                <p>{launcher[0]?.name }</p>
            </div>
            <div className='launcher-div'>
                <h3>city:</h3>
                <h4>{launcher[0]?.city}</h4>
            </div>
            <div className='launcher-div'>
                 <h3>rocketType:</h3>
                <p>{launcher[0]?.rocketType}</p>
            </div>
            <div className='launcher-div'>
                <h3>latitude:</h3>
                <p>{launcher[0]?.latitude}</p>
            </div>
            <div className='launcher-div'>
                 <h3>longitude:</h3>
                <p>{launcher[0]?.longitude}</p>
            </div>
            <button onClick={DeleteLauncher}>Delete Launcher</button>
         {error && (<div>{error}</div>)}
        </div>
        <div>
            <form className='create-card' onSubmit={handleSubmit}>
                <h3>to update this launcher</h3>
            <div className='input'>
                <label >city:</label>
                <input type="text"  placeholder='enter city' onChange={(e) => setCity(e.target.value)} />
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
             <div className='input'>
                <label>latitude:</label>
                <input type="number" placeholder='enter latitude'onChange={(e) => setLatitude(e.target.value)} />
            </div>
             <div className='input'>
                <label>latitude:</label>
                <input type="number" placeholder='enter latitude' onChange={(e) => setLongitude(e.target.value)} />
            </div>
             <div className='input'>
                <label>name:</label>
                <input type="text"  placeholder='enter name' onChange={(e) => setName(e.target.value)} />
            </div>
            <button type='submit'>Update This Launcher</button>
            {success && (<div className='success'>{success}</div>)}
            {error && (<div>{error}</div>)}
            </form>
        </div>   
    </div>

</section>
  )
}

export default MoreInfo
