import React from 'react'
import {assets} from '../assets/admin_assets/assets.js'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'

const Navbar = ({ token, setToken }) => {

    const navigate =useNavigate()
    
  const adminLogout = async () => {
    try {
     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/logoutAdmin`, {
        headers: {
         Authorization: `Bearer ${token}`,
       },
       withCredentials:true
      })
      setToken(null)
      navigate('/')
      toast.success(response?.data?.message)
  
    } catch (error) {
      console.log(error?.response?.data?.message||error.message);
      
    }
}

  return (
    <div className='flex items-center justify-between px-[4%] py-[4%] md:py-2'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
          <button className={`bg-gray-500 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full cursor-pointer ${!token && 'hidden'}`}
              onClick={adminLogout}>Logout</button>
    </div>
  )
}

export default Navbar

