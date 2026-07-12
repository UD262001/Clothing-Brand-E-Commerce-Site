import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation,useNavigate } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import axios from 'axios'

const App = () => {

  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const navigate = useNavigate()
  

  

  const onRefresh = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/refreshAdmin`, { withCredentials: true })
      

      setToken(response.data.token)
      navigate('/add')
      

    } catch (error) {
      console.log(error?.response?.data?.message||error.messsage);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    onRefresh()
  },[])
  
  return (<>
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
        theme="light" />
      {loading ? <div className="w-full h-scren flex justify-center items-center">
      </div> : <>
      <Navbar token={token} setToken={setToken} />
      <hr/>
      {token ?        
        <div className="flex w-full">
          <Sidebar />
          <div className="w-[70%] mx-auto ml-[5vw,25px)] my-8 text-gray-600 text-base relative">
            <Routes>
              <Route path="/add" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
            </Routes>
          </div>
        </div>
        :
          <Login setToken={setToken}/>
        }
        </>}
      
    </div>
      </>
  );
};

export default App;
