import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import './HomePage.css'
import { Link, useNavigate } from 'react-router'
function HomePage() {

    const [launchers , setLaunchers] = useState([])
    const [error , setError] = useState('')
    const [searchByCity ,setSearchByCity ] = useState('')
    const [searchByRocketType ,setSearchRocketType ] = useState('')

    const navigate = useNavigate()
    
    useEffect(() =>{

        const getAllLaunchers = async () =>{
          setError(null)
          try{
          const data = await axios.get('http://localhost:3016/api/launchers')
          setLaunchers(data.data.launchers)
          }catch(err){
            const error = new AxiosError(err)
            setLaunchers(error.response.data.error || 'faild to get launchers')
          }
          

        }

        getAllLaunchers()
} , [])
    function addLauncher() {
      navigate('/add/launcher')
      
    }

    const filter = launchers.filter((launcher) => {
       return launcher.city.toLowerCase().includes(searchByCity.toLocaleLowerCase())&&
              launcher.rocketType.toLowerCase().includes(searchByRocketType.toLocaleLowerCase())

    })

    

  return (
    <div>
      <div className='nav'>
        <h1>Home Page</h1>
        <button className = 'add-btn' onClick={addLauncher}>addLauncher</button>
        <div className='search'>
          <label>Search by city :</label>
         <input type="text" placeholder='search by city' onChange={(e) => setSearchByCity(e.target.value)}/>
        </div>
        <div className='search'>
           <label>Search by rocketType :</label>
          <input type="text" placeholder='search by rocketType' onChange={(e) => setSearchRocketType(e.target.value)}/> 
        </div>
       
      </div>
      <table>
        <tr>
            <th>Id</th>
            <th>city</th>
            <th>rocketType</th>
            <th>More info</th>
        </tr>
            {filter.map((launcher) =>{
              return(
                <tr key={launcher._id}>
                  <th>{launcher._id}</th>
                  <th>{launcher.city}</th>
                  <th>{launcher.rocketType}</th>
                  <th><Link className='link' to={`/launcher/${launcher._id}`}>More Info</Link></th>

                </tr>
              )
            })}
     </table>
      {error && (<div>{error}</div>)}
    </div>
  )
}

export default HomePage