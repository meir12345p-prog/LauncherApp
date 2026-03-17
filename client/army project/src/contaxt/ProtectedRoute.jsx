import React from 'react'

import AuthUserStore from './AuthUserStore'
import { useNavigate } from 'react-router'
function ProtectedRoute({children}) {
    const token = AuthUserStore((state)=> state.token)
    const navigate = useNavigate()
    if(!token){
        return navigate('/')
    }

  return children
}

export default ProtectedRoute
