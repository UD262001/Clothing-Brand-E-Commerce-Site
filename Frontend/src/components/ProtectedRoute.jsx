import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ProtectedRoute = ({ children }) => {
   
    const { token, loading } = useContext(UserContext)
   
    const { setLastPathName } = useContext(ShopContext)
   
    const location = useLocation()


    if (loading) {
        return (
            <div className='min-h-[40vh] flex items-center justify-center text-gray-600'>
                Loading...
            </div>
        )
    }

    if (!token) {
        setLastPathName(location.pathname)
        return <Navigate to='/login' replace state={{ from: location }} />
    }

    return children
}

export default ProtectedRoute
