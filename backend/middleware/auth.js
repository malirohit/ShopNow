 // In this file we will authenticate the user Whenever 
 // user add the product in the cart , or 
 // update the cart data or user will place the order


 // This middleware will convert the user token into user id
 
 import jwt from 'jsonwebtoken'

 // next is call-back
 const authUser = async (req,res,next) =>{

    const { token  } = req.headers; // Get the users token from the headers 

    if(!token) { // if token is not available in header
        return res.json({success:false,message:'Not Authorized Login Again'})
    }

    try{ 
        // decode the token
        // In this token we will get decoded id
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)

        // When we have created the token , 
        // we have added one object & in that object we have the user's id
        // Now we will get that user id from this token and we will set that in request.body.user_id property 

        req.body.userId = token_decode.id // In the body of request it will add the userId property that we will get from this token
        // Using this we can update the cart , place the order.

        next()
    }
    catch(error) {
         console.log(error);
         req.json({success:false,message:error.message})
         
    }
        
 }

 export default authUser

 // This middle ware will take our token and verfiy that 
 // and using that token it will generate the id and provide the id in req.body



