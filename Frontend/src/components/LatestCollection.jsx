import React, { useContext, useEffect, useState } from 'react'
import { ShopDataContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from './ProductItem';

const LatestCollection = () => {

  const {products} = useContext(ShopDataContext);
  

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(()=>{
    if (products.length > 0) {
      setLatestProducts(products.slice(0, 10)); 
    }
  },[products])
  
return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl '>
            <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, nemo natus error veritatis suscipit possimus!
            </p>
        </div>
     {/*rendring-producs  */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y'>
         {
            latestProducts.map((item,index)=>(
              <ProductItem key={index} _id={item._id} image={item.images?.[0]} name={item.name} price={item.price}/>
            ))
         }
      </div>
    </div>
  )
}

export default LatestCollection