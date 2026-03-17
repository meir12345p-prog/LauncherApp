import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import './MoreInfo.css'
function MoreInfo() {

    const [launcher , setLauncher] = useState([])
    const [name , setName] = useState('')
    const [rocketType , setRocketType] = useState('')
    const [latitude , setLatitude] = useState(null)
    const [longitude , setLongitude] = useState(null)
    const [city , setCity] = useState('')
    const [destroyed , setDestroyed] = useState('')
    const [error , setError] = useState('')
    const [success , setSuccess] = useState('')

    const navigate = useNavigate()
    const {id} = useParams()
        
    useEffect(() =>{
    
            const getAllLaunchers = async () =>{
              setError(null)
              try{
              const token = localStorage.getItem('token')
                const data = await axios.get('http://localhost:3019/api/launchers',{
            headers: {Authorization :`Bearer ${token}` }
          }) 
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
            const token = localStorage.getItem('token')
        const res = await axios.delete(`http://localhost:3019/api/launchers/${id}`,{
            headers: {Authorization :`Bearer ${token}` }
          })
        alert('launcher got deleted')
        navigate('/api/launchers')
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
            const token = localStorage.getItem('token') 
            const data = await axios.put(`http://localhost:3016/api/launchers/${id}` ,{
                city,
                rocketType,
                latitude,
                longitude,
                name,
                destroyed
            },{
            headers: {Authorization :`Bearer ${token}` }
          })
            setSuccess(data.data.message) 
        }catch(err){
            console.log(err);
        const error = new AxiosError (err)
        setError(error.response.data.error || 'faild to add launcher')
        }
            
        }

         function HomePage() {
        navigate('/api/launchers')
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


  return (
    <section>
    <nav className='navbar'>
        <h1>More Info Launcher</h1>
        <div>
        <button onClick={HomePage}>Home Page</button>
        <button onClick={userInfo}>user info</button>
        <Link to={'/'}><button onClick={handleClick}>logout</button></Link>
          </div>

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
            <div className='launcher-div'>
                 <h3>destroyed:</h3>
                <p>{launcher[0]?.destroyed}</p>
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
         
            <div  className='input'>
                   <label>change destroyed :</label>
                <select onChange={(e) => setDestroyed(e.target.value)}>
                    <option value="" disabled>select destroyed</option>
                    <option value="true">destroyed</option>
                    <option value="false">Not destroyed</option>
                </select> 
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
