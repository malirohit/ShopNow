import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ( {category , subCategory} ) => {
  
    const products = useContext(ShopContext);

    // console.log("All products in related = ", products);
    // console.log("Product Length = ", products.length);

    const [related,setRelated]=useState([]);

    // useEffect(()=>{

    //     if(products.length > 0 )
    //     {
    //         const productsCopy = products.slice();

    //         console.log("Copy of products - ",productsCopy)

    //         productsCopy = productsCopy.filter((item)=>category === item.category );

    //         productsCopy = productsCopy.filter((item)=>subCategory === item.subCategory );

    //         //setRelated(productsCopy.slice(0,5));
    //        // console.log(productsCopy.slice(0,5));

    //     }

    // },[products]);

    let productsCopy = products;
    
    // console.log("Copy of products = ",productsCopy) // working 

    // console.log(Array.isArray(productsCopy));
    
    // productsCopy = productsCopy.filter((item)=>category === item.category );
    
    // productsCopy = productsCopy.filter((item)=>subCategory === item.subCategory );

    // productsCopy = productsCopy
    // .filter(item => category === item.category)
    // .filter(item => subCategory === item.subCategory);
    
    //             //setRelated(productsCopy.slice(0,5));
    //  console.log("Filtered Products = ", productsCopy.slice(0,5) );

  return (
    <div className='my-24' >

      <div className='text-center text-3xl py-2' >
         <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6' >
         {
            related.map( (item,index)=>(
                <ProductItem key={index} id={item._id}  name={item.name} price={item.price} image={item.image} />
            ) )
         }
      </div>

    </div>
  )
}

export default RelatedProducts
