import React,{useContext,useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import ProtectedRoute from './components/ProtectedRoute'
import Verify from './pages/Verify'
import { ToastContainer } from 'react-toastify';
import { UserContext } from './context/UserContext'
import { ShopContext } from './context/ShopContext'
import axios from 'axios'
import ScrollToTop from './components/ScrollToTop'

const App = () => {

 console.log('app renders');
 
  const { setToken, setUser,setLoading } = useContext(UserContext)

  const { setCartItems } = useContext(ShopContext)
  

  
  

  useEffect(() => {

    const controller = new AbortController()



    const onRefresh = async () => {
      
    try {
     

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/refresh`, { withCredentials: true, signal: controller.signal })
      
      

      setToken(response.data.accessToken)
      setUser(response.data.user)
      setCartItems(response.data?.user?.cartData);
      // navigate('/')

      
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false)
    }
  }

    onRefresh()

    return () => {
      controller.abort()
    }
  },[])

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:Id' element={<Product/>}/>
        <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/place-order' element={<ProtectedRoute><PlaceOrder/></ProtectedRoute>}/>
        <Route path='/orders' element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
        <Route path='/verify' element={<ProtectedRoute><Verify/></ProtectedRoute>}/>
      </Routes>
      <Footer/>

    </div>
  )
}

export default App
