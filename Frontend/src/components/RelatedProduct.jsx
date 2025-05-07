import React, { useContext, useEffect, useState } from 'react'
import { ShopDataContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem' 
import Title from '../components/Title'

const RelatedProduct = ({category,subCategory}) => {

    const {products} = useContext(ShopDataContext);
   const [relatedProducts, setRelatedProducts] = useState([]);

   useEffect(()=>{
       if(products.length > 0){
            let productCopy = products.slice() ;
            productCopy = productCopy.filter((item)=> category === item.category)
            productCopy = productCopy.filter((item)=> subCategory ===  item.subCategory )
           setRelatedProducts(productCopy.slice(0,5));

       }
   },[products])
  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
         <Title text1={'RELATED'} text2={'PRODUCTS'}/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-4 mt-10 mb-10 '>
        {relatedProducts.map((item,index)=>(
          <ProductItem key={index} _id={item._id} name={item.name} price={item.price} image={item.images?.[0]}/>  
        ))}
      </div>
    </div>
  )
}

export default RelatedProduct