import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import './HomePage.css'
import { Link, useNavigate } from 'react-router'
import AuthUserStore from '../contaxt/AuthUserStore'
function HomePage() {

    const [launchers , setLaunchers] = useState([])
    const [error , setError] = useState('')
    const [searchByCity ,setSearchByCity ] = useState('')
    const [searchByRocketType ,setSearchRocketType ] = useState('')
    const [admin , setAdmin] = useState(false)
    const [destroyed , setDestroyed] = useState('')


    const navigate = useNavigate()
    
    useEffect(() =>{

        const getAllLaunchers = async () =>{
          setError(null)
          try{
            const token = localStorage.getItem('token')
            const user = JSON.parse(localStorage.getItem('user'))
          const data = await axios.get('http://localhost:3019/api/launchers',{
            headers: {Authorization :`Bearer ${token}` }
          })          
          setLaunchers(data.data.launchers)
          
          if(user.user_type === 'admin'){
            setAdmin(true)
          }
          }catch(err){
            const error = new AxiosError(err)
            setError(error.response.data.error || 'faild to get launchers')
          }
          

        }

        getAllLaunchers()
} , [])
    function addLauncher() {

        const token = localStorage.getItem('token')
        
        if(!token){
            navigate('/')
        }
      navigate('/api/launchers/add/launcher')
      
    }

    const filter = launchers.filter((launcher) => {
       return launcher.city.toLowerCase().includes(searchByCity.toLocaleLowerCase())&&
              launcher.rocketType.toLowerCase().includes(searchByRocketType.toLocaleLowerCase())&&
              launcher.destroyed.toLowerCase().includes(destroyed.toLocaleLowerCase())
    })

    function handleClick() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
    }

    async function userInfo(event) {
         event.preventDefault()

         try{
            const token = localStorage.getItem('token')
            const res = await axios.get('http://localhost:3019/api/auth/getUser',{
            headers: {Authorization :`Bearer ${token}` }
        })
            const {username , user_type} = res.data
            
            
            alert(`you are ${username} and your user type is ${user_type}`)
         }catch(err){
            console.log(err);    
         }
    } 

    function addUser() {
        navigate('/auth/register/create')
    }

    

  return (
    <div>
      <div className='nav'>
        <h1>Home Page</h1>
        {admin && (<button className = 'add-btn' onClick={addUser}>Add User</button>)}
        <button className = 'add-btn' onClick={addLauncher}>Add Launcher</button>
        <div className='search'>
          <label>Search by city :</label>
         <input type="text" placeholder='search by city' onChange={(e) => setSearchByCity(e.target.value)}/>
        </div>
        <div className='search'>
           <label>Search by rocketType :</label>
          <input type="text" placeholder='search by rocketType' onChange={(e) => setSearchRocketType(e.target.value)}/>        
        </div>
        <div className='search'>
           <label>Search by destroyed :</label>
          <select onChange={(e) => setDestroyed(e.target.value)}>
                    <option value="" disabled>select destroyed</option>
                    <option value="true">destroyed</option>
                    <option value="false">Not destroyed</option>
                </select>       
        </div>
         <div>   
            <button onClick={userInfo}>user info</button>
             <Link to={'/'}><button onClick={handleClick}>logout</button></Link>
            </div> 
       
      </div>
      <table>
        <tr>
            <th>Id</th>
            <th>city</th>
            <th>rocketType</th>
            <th>destroyed</th>
            <th>More info</th>
        </tr>
            {filter.map((launcher) =>{
              return(
                <tr key={launcher._id}>
                  <th>{launcher._id}</th>
                  <th>{launcher.city}</th>
                  <th>{launcher.rocketType}</th>
                  <th>{launcher.destroyed}</th>
                  <th><Link className='link' to={`/api/launchers/launcher/${launcher._id}`}>More Info</Link></th>

                </tr>
              )
            })}
     </table>
      {error && (<div>{error}</div>)}
    </div>
  )
}

export default HomePage