import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method,setMethod] = useState('cod');
  const {navigate , backendUrl , token , cartItems , setCartItems , getCartAmount , delivery_fee , products } = useContext(ShopContext);

  const [formData,setFormData] = useState({
   firstName : '',
   lastName : '',
   email : '',
   street : '',
   city : '',
   state : '',
   zipcode : '',
   country : '',
   phone : ''

  })

  const onChangeHandler = (event)=>{
       const name = event.target.name
       const value = event.target.value
       setFormData( data => ({...data,[name]:value}) )
  }



  const onSubmitHandler = async (event) => {

   
   event.preventDefault()

    try {
      
      let orderItems = []

   // 11:09:57

   for(const items in cartItems ){
      for(const item in cartItems[items]){
         if(cartItems[items][item] > 0  ){
            const itemInfo = structuredClone(products.find( product => product._id === items ))
            if(itemInfo){ // If item info is available
               itemInfo.size = item
               itemInfo.quantity = cartItems[items][item]
               orderItems.push(itemInfo)
            }
         }
      }
   }

   // console.log(orderItems); // Working

   let orderData = {
      address : formData,
      items : orderItems,
      amount : getCartAmount() + delivery_fee
   }
   
   switch(method){


      // API Call for COD
       case 'cod' :
         const response = await axios.post( backendUrl + '/api/order/place' , orderData,{headers:{token}} )
         console.log(response.data.success)
         if(response.data.success) {
            setCartItems({}) // Order is placed , now clear the cart data 
            navigate('/orders')
         }
         else 
         {
            toast.error(response.data.message)
         }
       break;

       case 'stripe':
         const responseStripe = await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{token}})
         if(responseStripe.data.success) { // It means we will get session url
            const {session_url} = responseStripe.data // extract session_url from responseStripe.data property
            // On this session url we will send the users by below line
            window.location.replace(session_url)
         } else {
            toast.error(responseStripe.data.message)
         }
       break;

       case 'razorpay':

        const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay' , orderData , { headers:{token} } )

        if(responseRazorpay.data.success) {
          //  console.log(responseRazorpay.data.order); // Working
          
            initPay(responseRazorpay.data.order)

        }

       break;

       default:
         break;


   }


    } catch (error) {
       console.log(error);
       toast.error(error.message)
       
    }
   
  }

  // We will take this order details and execute our razorpay payment
  const initPay = (order) =>{
   const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Order Payment',
      description:'Order Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async (response) => { // In this response we have orderId
         console.log(response);

         try {
            
             // It will call the API verify the payment we had made through razorpay
             const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay', response , {headers:{token}}  )

             if(data.success){
               navigate('/orders')
               setCartItems({})
             }

         } catch (error) {
            console.log(error);
            toast.error(error.message)
            
         }
         
      }
   }

   const rzp = new window.Razorpay(options)
   rzp.open()

  }



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t ' >
       
       {/* LEFT SIDE */}
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]' >
           
           <div className='text-xl sm:text-2xl my-3' >            
              <Title text1={'DELIVERY'} text2={'INFORMATION'} />
           </div>

           <div className='flex gap-3' >
              <input required onChange={onChangeHandler} name='firstName' value={formData.firstName}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='First Name' />
              <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Last Name' />
           </div>
         
           <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Email Address' />
           <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Street' />
         
           <div className='flex gap-3' >
              <input required onChange={onChangeHandler} name='city' value={formData.city}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='City' />
              <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='State' />
           </div>

           <div className='flex gap-3' >
              <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Zipcode' />
              <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="country" placeholder='Country' />
           </div>

          
            <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Phone Number' />
           

        </div>

        {/* RIGHT SIDE */}
       
        <div className='mt-8' >
  
               <div className='mt-8 min-w-80' >
                  <CartTotal />
               </div>

               <div className='mt-12' >

                  <Title text1={'PAYMENT'}  text2={'METHOD'} />
                  {/* Payment Methods */}
                  <div className='flex gap-3 flex-col lg:flex-row' >

                    <div onClick={()=> setMethod('stripe') } className='flex items-center gap-3 border p-2 px-3 cursor-pointer' >
                         <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : '' } `} ></p>
                         <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                    </div>

                    <div onClick={()=> setMethod('razorpay') } className='flex items-center gap-3 border p-2 px-3 cursor-pointer' >
                         <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : '' } `} ></p>
                         <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                    </div>

                    <div onClick={()=> setMethod('cod') } className='flex items-center gap-3 border p-2 px-3 cursor-pointer' >
                         <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : '' } `} ></p>
                         <p className='text-gray-500 text-sm font-medium mx-4 ' >CASH ON DELIVERY</p>
                    </div>

                  </div>

                  <div className='w-full text-end mt-8' >
                  {/* onClick={()=>navigate('/orders')} */}
                     <button type='submit'   className='bg-black text-white px-16 py-3 text-sm ' >Place Order</button>
                  </div>

               </div>



        </div>


    </form>
  )
}

export default PlaceOrder
