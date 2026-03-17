import React from 'react'
import AuthUserStore from './AuthUserStore'
import { Navigate } from 'react-router'
function ProtectedRouteFromAir({children}) {
    const token = AuthUserStore((state)=> state.token)
    const user = AuthUserStore((state) => state.user)
    
    if(!token || user.user_type === 'air-army'){
       return <Navigate to='/api/launchers'/>
    }

  return children
}
export default ProtectedRouteFromAir
