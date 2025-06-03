import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const {products} = useContext(ShopContext); {/* now this products contains = original products , currency , delivery_fee */}

    //console.log(products);

    const [latestProducts, setLatestProducts] = useState([]);

    useEffect( ()=>{ setLatestProducts( products.slice(0,10) ) } , [products] );

  return (
    <div className='my-10' >
        
        <div className='text-center py-8 text-3xl ' >
            <Title text1={'LATEST'} text2={'COLLECTIONS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600' >
               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore qui voluptatum aliquam quis quisquam. Architecto tempora id quidem, enim nam veniam delectus illo repellendus, unde natus eligendi molestiae maiores culpa!
            </p>
        </div>
       
        {/* Rendering Products */}
        <div className='grid grid-col-2 sm:grid-cols-4 lg:grid-cols5 gap-4 gap-y-6' >
            {
                latestProducts.map( (item,index)=> (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                 ) )
            }
        </div>

    </div>
  )
}

export default LatestCollection
