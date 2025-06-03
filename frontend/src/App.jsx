import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';  // taken from react-toastify website
import 'react-toastify/dist/ReactToastify.css'; // taken from react-toastify website
import Cart from './pages/Cart'
import About from './pages/About'
import Verify from './pages/Verify'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]  ' >
     
      <ToastContainer />
      <Navbar /> { /* We have put Navbar here so that it will be available to all pages */ }

      <SearchBar />

      <Routes>
         <Route path='/'  element={ <Home/> } /> 
         <Route path='/collection' element={ <Collection/> } />
         <Route path='/contact' element={ <Contact/> } />
         <Route path='/product/:productId' element={ <Product /> } />   {/* Whenever we open the product we will need the product ID */}
         <Route path='/login' element={ <Login/> } />
         <Route path='/place-order' element={ <PlaceOrder/> } />
         <Route path='/orders' element={ <Orders/> } />
         <Route path='/cart' element={ <Cart/> } />
         <Route path='/about' element={ <About /> } />
         <Route path='/verify' element={ <Verify /> } />

      </Routes>

      <Footer />
      
    </div>
  )
}

export default App
