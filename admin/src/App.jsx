import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";

const App = () => {

  const [token, setToken] = useState(null)

  
  
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
theme="light"/>
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
      
    </div>
      </>
  );
};

export default App;
