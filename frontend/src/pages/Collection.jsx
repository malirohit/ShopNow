import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext); // total product data 

  const [showFilter, setShowFilter] = useState(false);

  const [filterProducts,setFilterProducts] = useState([]);

  const [category , setCategory] = useState([]);
  const [subcategory , setSubCategory] = useState([]);

  const [sortType ,setSortType] = useState('relavent');

  useEffect( ()=>{ applyFilter(); }, [ category,subcategory , search , showSearch , products] );

  useEffect( ()=>{ sortProduct(); }, [sortType] )

  
  const toggleCategory = (e) =>{
   
      if(category.includes(e.target.value))
         setCategory( (prev)=> prev.filter( item => item !== e.target.value ) )
      else
         setCategory( prev => [...prev,e.target.value] )

  }

  const toggleSubCategory = (e)=>{

      const val = e.target.value;

      // Update the subcategory array based on selection
      if (subcategory.includes(val)) {
         setSubCategory(prev => prev.filter(item => item !== val));
      } else {
         setSubCategory(prev => [...prev, val]);
      }
      
  }


  
  const applyFilter = ()=>{  {/* Apply filter through we get category or subcategory . Only runs when category and filter category are changed . */}
    
             // applyFilter  , filters the products getting through category and subcategory .

            //  let productsCopy = products.slice();
            let productsCopy = [...products];
            

             if( showSearch && search ) {
                productsCopy = productsCopy.filter( item=> item.name.toLowerCase().includes(search.toLowerCase()) )
             }

             if(category.length > 0){
                productsCopy = productsCopy.filter( item => category.includes( item.category ));
                console.log("category array = ",Array.isArray(productsCopy));
             }
     

            
             if(subcategory.length>0){
                 console.log("Filtered Products From subcategory");
                 productsCopy = productsCopy.filter( item => subcategory.includes(item.subcategory) )
                 console.log(productsCopy);
                 console.log("subcategory array = ",Array.isArray(productsCopy));
               
             }

           setFilterProducts(productsCopy);
           console.log(productsCopy);
  }
  
  // useEffect( ()=>{console.log(category)}, [category] )
  // useEffect( ()=>{console.log(subcategory)}, [subcategory] )


  // Sort Type 
  const sortProduct = ()=>{

      // const [sortType ,setSortType] = useState('relavent')

       let fpCopy = filterProducts.slice(); // array of filetered products 
      
        switch (sortType)
      { 
         case 'low-high':
            setFilterProducts(fpCopy.sort( (a,b)=>(a.price-b.price) )) // js function . Sorting on basis of price . ascending order
            break;
         
         case 'high-low':
            setFilterProducts(fpCopy.sort( (a,b)=>(b.price-a.price) ))  // js function . Sorting on basis of price . descending order
   
         default:
            applyFilter();
            break;
      }
  }

  return (
    <div className='flex flex-col gap-1 sm:flex-row  sm:gap-10 pt-10 border-t'>
       
      {/* Filter Options - leftside */}
      <div className="min-w-60">

        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img
            className={`h-3 ${showFilter ? 'rotate-90' : ''} sm:hidden`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${ showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'}  onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'}  onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'}  onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

        {/* Sub-Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${ showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory } /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory } /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory } /> Winterwear
            </p>
          </div>
        </div>

      </div>
     
      {/* Right Side */}
      <div className="flex-1">

         <div className='flex justify-between text-base sm:text-2xl mb-4'>

            <Title text1={'ALL'} text2={'COLLECTIONS'} />

            {/* Product Sort */}
            {/*  const [sortType ,setSortType] = useState('relavent') */}
            <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 '  >
                 <option value="relavent">Sort by : Relavent</option>
                 <option value="low-high">Sort by : Low to High</option>
                 <option value="high-low">Sort by : High to Low</option>
            </select>

         </div>

          {/* Map Products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6' >
            {
              filterProducts.map( (item,index)=>(
               <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
              ) )
            }
           </div>

      </div>

    </div>
  );
};

export default Collection;

