import React, { useContext, useEffect, useState } from 'react'
import {ShopDataContext} from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const {products,search , showSearch} =useContext(ShopDataContext);
  const [showfilter, setShowfilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e)=>{
      const value = e.target.value;
      if(category.includes(value)){
          setCategory(category.filter((item)=> item !== value))    
      }
      else{
          setCategory([...category , value])
      }
  }

  const toggleSubCategory = (e)=>{
    const value = e.target.value;
    if(subCategory.includes(value)){
        setSubCategory(subCategory.filter((item)=> item !== value))    
    }
    else{
      setSubCategory([...subCategory , value])
    }
}

const applyFilter = ()=>{
     let tempProducts = products;

     if(showSearch && search ){
      tempProducts = tempProducts.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
     }

     if(category.length >0){
        tempProducts = tempProducts.filter(item=> category.includes(item.category))
     }

     if(subCategory.length >0){
      tempProducts = tempProducts.filter(item=> subCategory.includes(item.subCategory))
   }

   switch (sortType) {
    case 'low-high':
      tempProducts.sort((a, b) => (a.price) - (b.price));
      break;

    case 'high-low':
      tempProducts.sort((a, b) => (b.price) -(a.price));
      break;

    default:
      break;
  }
    
     setFilterProducts(tempProducts)
}

useEffect(()=>{
  if (Array.isArray(products)) {
    console.log(products)
    applyFilter();
  }
},[products, sortType, category, subCategory, search, showSearch])



  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
     {/* filter options */}
      <div className='min-w-60'>
         <p onClick={()=> setShowfilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <i className={`sm:hidden ${showfilter ? "rotate-90":""} ri-arrow-drop-right-line`}></i>
         </p>
         {/* category */}
         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? "":"hidden"} sm:block`}>
           <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <label className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/> Men
              </label>
              <label className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}/> WoMen
              </label>
              <label className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/> Kids
              </label>
           </div>
         </div>

        {/* SubCategory filter*/}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? "":"hidden"} sm:block`}>
           <p className='mb-3 text-sm font-medium'>TYPE</p>
           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <label className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
              </label>
              <label className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
              </label>
              <label className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
              </label>
           </div>
         </div>
      </div>
       {/* Right side */}
       <div className='flex-1'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={"ALL"} text2={"COLLECTION"} />
                {/* product sort */}
                <select onChange={(e)=> setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                   <option value="relavent">Sort by: Relavent</option>
                   <option value="high-low">Sort by: Low to High</option>
                   <option value="low-high">Sort by: High to Low</option>
                </select>
            </div>
            {/* map product */}
            <div className='grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-5 gap-y-6'>
            {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} _id={item._id} image={item.images?.[0]} name={item.name} price={item.price}/>
              
            ))
         }
            </div>
    
          </div>
    </div>
  )
}

export default Collection