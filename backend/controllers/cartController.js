import userModel from "../models/userModel.js"; // Ensure .js extension




// add product to user cart
const addToCart = async (req,res)=>{
       try {
        const {userId,itemId,size} = req.body
        
        const userData = await userModel.findById(userId)

        let cartData = await userData.cartData;

        if(cartData[itemId]) // If that item is present 
        {
            if(cartData[itemId][size]) // if the item is present along with size
            {
                cartData[itemId][size] += 1 // then just increase its quantity
            }
            else // Else item is not present
            {
                cartData[itemId][size] = 1 
            }
        }
        else  // Else if item is not present (In cartData we don't have any product with this item id)
        {
            cartData[itemId]= {} // For this particular id we will create the object
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId,{cartData})
        
         res.json({success:true,message:"Added to Cart"})

       } catch (error) {
          console.log(error)
          res.json({success:false,message: error.message})
       }
}

//update user cart
const updateCart = async (req,res)=>{
   try {

       const {userId, itemId,size,quantity} = req.body

       const userData = await userModel.findById(userId)
       let cartData   = await userData.cartData;

       cartData[itemId][size] = quantity

       await userModel.findByIdAndUpdate(userId,{cartData})

       res.json({ success: true, message: "Cart Updated" })

   } catch (error) {
      console.log(error)
      res.json({success:false,message: error.message})
   }
}

//get user cart data
const getUserCart = async (req,res)=>{
   try {
    
     const {userId} = req.body
     const userData = await userModel.findById(userId)
     let cartData = await userData.cartData;

     res.json({success:true,cartData})
      

   } catch (error) {
    console.log(error)
    res.json({success:false,message: error.message})
   }
}

export {addToCart,updateCart,getUserCart}