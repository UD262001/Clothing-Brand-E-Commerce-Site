import React from 'react'
import {assets} from '../assets/admin_assets/assets.js'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ token, setToken }) => {

    const navigate =useNavigate()
    

  return (
    <div className='flex items-center justify-between px-[4%] py-[4%] md:py-2'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
          <button className={`bg-gray-500 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full cursor-pointer ${!token && 'hidden'}`}
              onClick={() => {
                setToken(null)
                navigate('/')
              }}>Logout</button>
    </div>
  )
}

export default Navbar

