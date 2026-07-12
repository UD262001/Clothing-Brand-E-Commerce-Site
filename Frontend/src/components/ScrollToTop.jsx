import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'



const ScrollToTop = () => {

    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)    
  },[pathname])
  
  return <Navigate to={pathname}/>
}

export default ScrollToTop
