import React from 'react'
import AuthUserStore from './AuthUserStore'
import { Navigate } from 'react-router'


function AdminProtectedRoute({children}) {
    const user = AuthUserStore((state) => state.user)   
    console.log(user);
     
    if(user.user_type !== 'admin'){
       return <Navigate to='/api/launchers'/>
    }

  return children
}

export default AdminProtectedRoute
