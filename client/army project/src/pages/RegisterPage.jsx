import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import AuthUserStore from '../contaxt/AuthUserStore'
import './AddLauncher.css'

function RegisterPage() {

    const [username , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [email , setEmail] = useState('')
    const [user_type , setUser_Type ] = useState('')
    const [error , setError] = useState('')
    const [success , setSuccess] = useState('')
    const navigate = useNavigate()


    
    async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')


    try{
          const token = localStorage.getItem('token')
        const data = await axios.post('http://localhost:3019/api/auth/register/create' ,{
            username,
            password,
            email,
            user_type,
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
    <nav className='nav'>
            <h1>Add User Page</h1>
            <div>
                    <button onClick={HomePage}>Home Page</button>
                    <button onClick={userInfo}>user info</button>
                    <Link to={'/'}><button onClick={handleClick}>logout</button></Link>
             </div>
            

        </nav>
    <div className='add-container'>
        
        
        <form className='create-card' onSubmit={handleSubmit}>
            <div className='input'>
                <label >UserName:</label>
                <input type="text" required placeholder='enter username' onChange={(e) => setUserName(e.target.value)} />
            </div>
             
             <div className='input'>
                <label>Password:</label>
                <input type="password" required placeholder='enter password'onChange={(e) => setPassword(e.target.value)} />
            </div>
             <div className='input'>
                <label>Email:</label>
                <input type="email" required placeholder='enter email' onChange={(e) => setEmail(e.target.value)} />
            </div>
             <div className='input'>
                <label>User Type:</label>
                <select onChange={(e) => setUser_Type(e.target.value)}>
                    <option value="" disabled>select rocketType</option>
                    <option value="admin">Admin</option>
                    <option value="intelegens-army">intelegens-army</option>
                    <option value="air-army">air-army</option>
                    
                </select>
            </div>
            <button type='submit' className='btn'>Create User</button>
        </form>
        {error && (<div >{error}</div>)}
        {success && (<div className='flag'>{success}</div>)}
      
    </div>
</section>
  )
}

export default RegisterPage