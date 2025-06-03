
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js"

//function for add product
const addProduct = async (req, res) => {
  // to add a product we will create a middleware using multer
  // so that if we send any file as a form data then that file will be passed using multer.
  // Create multer.js

  try {
    const {name,description,price,category,subCategory,sizes,bestseller} = req.body;

    // products image we will get from req.file
    // We will store the files in variables
    // if image1 is available in files then only store it in respective variable
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter( (item) => item !== undefined   );

    // imagesUrl is a array
    // We cannot store images in DB , therefore we will upload images on cloudinary
    // & it will give secure url for our images(each images) which we will store
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
          return result.secure_url 
    })
    );
    // After this all of the images will get uploaded on cloudinary and we will get the URL for each image

    // Now we have to store data in mongodb
    const productData = {
        name,
        description,
        category,
        price:Number(price), // In form data it will be in form of string 
        subCategory,
        bestseller:bestseller === "true" ? true : false , // In form data we will get bestseller as a string
        // sizes will be an array , therefore before sending that
        // We cannot send array directly as a form data
        // In frontend we will send sizes(array) that will get convert into string 
        // And again we will convert sizes from string to array
        sizes : JSON.parse(sizes),
        image : imagesUrl,
        date  : Date.now()
    }

    //console.log(name,description,price,category,subCategory,sizes,bestseller)
    // console.log(image1,image2,image3,image4)
    //console.log(images);
    //console.log(imagesUrl)
    // console.log(Hello);
    console.log(productData);

    const product = new productModel(productData);

    await product.save()
    
   // res.json({});
    res.json({success:true,message:"Product Added"});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

};

// function for list products
const listProducts = async (req, res) => {
  try {
    
     
    const products = await productModel.find({});


    res.json({success:true,products})

  } catch (error) {
     console.log(error)
     res.json({success:false,message:error.message})
  }
};

// function for removing product
const removeProduct = async (req, res) => 
  {
     try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})
     } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
     }
  };

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const {productId } = req.body // When we call this api we will give product id as input

    const product = await productModel.findById(productId)

    res.json({success:true,product})
  } catch (error) {
    console.log(error)
      res.json({success:false,message:error.message})
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };
