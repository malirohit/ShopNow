import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Used export here , so that we can use it in any component
export const backendUrl = import.meta.env.VITE_BACKEND_URL  // Address of backend. Backend Address
export const currency = '$'

const App = () => {

  // if token is available in localStorage 
  // When the state variable will get initialized it will check the local storage whether it is available or not

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  // Suppose we logged in and if we reload the webpage , we will get logged out
  // so to prevent this...
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* When we are not authenticated we will display login component */}

       <ToastContainer />

      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base ">
              <Routes>

                {/* Whenever we will make api call for add,list or order we have to provide token */}
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
