import React, {useState} from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({setToken}) => {

    const [credentials, setCredentials] = useState({
        email: '',
        password:''
    })

    const { email, password } = credentials
    
    const [error, setError] = useState(false)
    
    const navigate = useNavigate()


    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {

            
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, credentials)
            
            if (!res.data.success) {
                throw new Error('Fetch Failed')
            }
            
            

            setToken(res.data.token)
            navigate('/add')

        } catch (error) {
            
            setError(true)
        }
        
        
    }

  return (
      <div className='w-full h-[80vh] flex justify-center items-center '>
          <div className='bg-white shadow-2xl rounded-lg px-8 md:px-15 py-10  max-w-md'>
              <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
              <form onSubmit={onSubmitHandler}>
                  <div className='mb-3 min-w-72'>
                      <p className='text-sm font-medium text-black mb-2'>Email</p>
                      <input className={`rounded w-full border border-gray-200 outline-none px-3 py-2 ${error&&'border-red-400 placeholder:text-red-400'}`} type="email" placeholder='admin@email.com' name='email' value={email} onChange={(e)=>{setCredentials(prev=>({...prev,[e.target.name]:e.target.value}))}}/>
                  </div>

                  <div className='mb-3 min-w-72'>
                      <p className='text-sm font-medium text-black mb-2'>Password</p>
                      <input className={`rounded w-full border border-gray-200 outline-none px-3 py-2 ${error&&'border-red-400 placeholder:text-red-400'}`} type="password" placeholder='Enter Your Password' name='password' value={password} onChange={(e)=>{setCredentials(prev=>({...prev,[e.target.name]:e.target.value}))}}/>
                  </div>
                  <button className=' w-full bg-black text-white py-3 mt-3 rounded-2xl'>Login</button>
              </form>
      </div>
    </div>
  )
}

export default Login
