// We will add middleware for those API who need admin persmissions
import jwt from 'jsonwebtoken'


// next is call-back function
const adminAuth = async (req,res,next) => {
    try {
        // whenever we will call the api from admin auth then in the headers we will add the token
        const {token} = req.headers

        if(!token)
        {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }

        

        const token_decode = jwt.verify(token,process.env.JWT_SECRET);

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD )
        {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
 
        next()


    } catch (error) {
        console.log(error);
        
         res.json({success:false,message:error.message})
    }
}

export default adminAuth