import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token ,currency   } = useContext(ShopContext);

   // using backendUrl and token we will fetch the orders and store them in state variable

   const [orderData,setorderData] = useState([])

   const loadOrderData = async () => {
     try {
      

       if(!token){
        return null
       }


      //  {} = body
        const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
       // console.log(response.data); working
        
       // 11:29:49
       if(response.data.success) {
        let allOrdersItem = [] // Store different items in one array

        response.data.orders.map((order)=>{

          // See in console
          // Since order is single obj and in this we have items property , so this item is also one array

          order.items.map((item)=>{

            // Add some properties
            // I think we are changing below properties to their now( Atta tyanchi value ky ahe ) values
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })

        //console.log(allOrdersItem); // Working
 
        setorderData(allOrdersItem.reverse()) // Latest orders will be on top

       }

     } catch (error) {
      
     }
   }

   // We want to run this function we the webpage will get load
   useEffect( ()=>{
     loadOrderData()
   } , [token] )

  return (
    <div className='border-t pt-16' >
      
      <div className='text-2xl' >
           <Title  text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orderData.slice(1,4).map( (item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row  md:items-center md:justify-between gap-4 ' >

                 <div className='flex items-start gap-6 text-sm ' >
                   <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                   <div>
                      <p className='sm:text-base font-medium' >{item.name}</p>
                      <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                         <p >{currency}{item.price}</p>
                         <p>Quantity:{item.quantity} </p>
                         <p>Size: {item.size}</p>   
                      </div>
                      <p className='mt-1' >Date: <span className='text-gray-400' >{ new Date(item.date).toDateString() }</span> </p>
                      <p className='mt-1' >Payment: <span className='text-gray-400' >{ item.paymentMethod }</span> </p>
                   </div>
                 </div>

                 <div className='md: w-1/2 flex justify-between' >
                    <div className='flex items-center gap-2' >
                        <p className='min-w-3 h-2 rounded-full bg-green-500' ></p>
                        <p className='text-sm md:text-base' >{item.status}</p>
                    </div>
                    {/* loadOrderData = When Admin will change the order status from backend and if user click on Track Order button then it will show the new status which is updated by admin */}
                    <button onClick={loadOrderData} className='border px-4 py-2 text-sm ' >Track Order</button>
                 </div>

              </div>
          ) )
        }
      </div>

    </div>
  )
}

export default Orders
