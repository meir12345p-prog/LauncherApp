import React, { useState } from 'react'
import AuthUserStore from '../contaxt/AuthUserStore'
import { useNavigate } from 'react-router'
function LoginPage() {

    const [username , setUserName] = useState('')
    const [password , setPassword] = useState('')

    const {login , error} = AuthUserStore()

    const navigate = useNavigate()

   async function handleSubmit (event) {
    event.preventDefault()

    const res = await login(username , password)

    if(res){
        navigate('/api/launchers')
    }
    
   } 


  return (
    <div>
        <h1>Login page</h1>
        <form onSubmit={handleSubmit} >
            <div>
                <label>username :</label>
                <input type="text" placeholder='enter your name' required onChange={(e)=>setUserName(e.target.value)} />
            </div>
             <div>
                <label>password :</label>
                <input type="text" placeholder='enter your password' required onChange={(e)=>setPassword(e.target.value)} />
            </div>

            <button type='submit'>Login</button>
          
        </form>
        {error && (<div>{error}</div>)}
      
    </div>
  )
}

export default LoginPage
