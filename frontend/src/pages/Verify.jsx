// import React, { useContext, useEffect } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { useSearchParams } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import axios from 'axios'
// // Here we will add the logic using this we can verify our payment
// const Verify = ()=>{


//      const {navigate, token , setCartItems , backendUrl } = useContext(ShopContext)

//      // 12:38:35
//      // To get the parameters from URL
//     //  [searchParams] 
//     // const {searchParams,setSearchParams} = useSearchParams()
//      const  [searchParams] = useSearchParams()


//      // Extracting params from URL
//      const success = searchParams.get('success')
//      const orderId = searchParams.get('orderId')

//      const verifyPayment = async () => {
//         try {
            
//             if(!token) {
//                 return null
//             }

//             // Call the API to verify the stripe
//             const response = axios.post(backendUrl + '/api/order/verifyStripe' , {success,orderId}, {headers:{token}} )

//             if(response.data.success){ // it means we have verified the payment
//                 setCartItems({}) // Clear the cartData
//                 navigate('/orders')
//             } else { // If payment gets fail send the user on cart page
//                 navigate('/cart')
//             }


//         } catch (error) {
//             console.log(error);
//             toast.error(error.message)
//         }

//      }

//      // We have to run this function when we will open this webpage
//      useEffect( ()=>{
//         verifyPayment()
//      } ,[token])

//     return (
//         <div>

//         </div>
//     )
// }

// export default Verify

import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {
    
    const { token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); // Use useNavigate instead of destructuring navigate

    // Ensure searchParams exists before accessing 'get'

    // This method is not right method for verification but if we go through webhooks then it will be so long  method
    const success = searchParams?.get('success');
    const orderId = searchParams?.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) return;

            if (!success || !orderId) {
                toast.error("Invalid payment verification parameters.");
                navigate('/cart');
                return;
            }

            const response = await axios.post(
                `${backendUrl}/api/order/verifyStripe`,
                { success, orderId },
                { headers: { token } }
            );

            if (response.data.success) {
                setCartItems({}); // Clear cart data
                navigate('/orders');
            } else {
                navigate('/cart'); // If payment fails, redirect to cart page
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token]);

    return <div></div>;
};

export default Verify;
