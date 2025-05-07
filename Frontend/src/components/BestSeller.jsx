import React, { useContext, useEffect, useState } from 'react'
import {ShopDataContext} from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
const BestSeller = () => {
    const {products} = useContext(ShopDataContext);
    const [bestSellerProduct, setBestSellerProduct] = useState([])


    useEffect(() => {
      if (Array.isArray(products)) {
        const bestProduct = products.filter(item => item.bestSeller);
        setBestSellerProduct(bestProduct.slice(0, 5));
      } else {
        console.warn("Products is not an array:", products); // also fixed variable name here
      }
    }, [products]);

    return ( 
    <div className='my-10'>
        <div className='text-center py-8 text-3xl '>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, nemo natus error veritatis suscipit possimus!
            </p>
        </div>
     {/*rendring-producs  */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y'>
         {
            bestSellerProduct.map((item,index)=>(
              <ProductItem key={index} _id={item._id} image={item.images?.[0]} name={item.name} price={item.price}/>
            ))
         }
      </div>
    </div>
  )
  
}

export default BestSeller