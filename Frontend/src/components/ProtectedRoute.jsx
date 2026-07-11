import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { token, loading, user } = useContext(UserContext)
    const location = useLocation()

    if (loading || (token && !user)) {
        return (
            <div className='min-h-[40vh] flex items-center justify-center text-gray-600'>
                Loading...
            </div>
        )
    }

    if (!token) {
        return <Navigate to='/login' replace state={{ from: location }} />
    }

    return children
}

export default ProtectedRoute
