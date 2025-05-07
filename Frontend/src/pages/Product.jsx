import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {ShopDataContext} from '../context/ShopContext'
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {

  const {productId} = useParams();
  
  const {products, addToCart} = useContext(ShopDataContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fatchProductData = async ()=>{
      
      const product = products.find((item) => item._id === productId);
      
      if (product) {
        setProductData(product);
        setImage(product.images[0]);
      }
      else{
        console.warn('Product not found for ID:',productId);
      }
  }

  useEffect(() => {
    if (products.length > 0) {
      fatchProductData();
    }
  }, [productId, products]);

  
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product imagess  */}
           <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
               <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal '>
                   {
                    productData.images.map((item,index)=>(
                      <img 
                      onClick={() => setImage(item)} 
                      key={index} 
                      src={item} 
                      alt='' 
                      className='w-[24%] sm:w-full sm:h-24 object-cover rounded-md cursor-pointer' 
                    />
                    ))
                   }
               </div>
               <div className='w-full sm:w-[80%]'>
                    <img className='w-full h-auto' src={image} alt="" />
               </div>
           </div>
           {/* product information */}
           <div className='flex-1'>
              <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
              <div className='flex items-center gap-1 mt-2'>
                 <i className="ri-star-line"></i>
                 <i className="ri-star-line"></i>
                 <i className="ri-star-line"></i>
                 <i className="ri-star-line"></i>
                 <i className="ri-star-line"></i>
                 <p className='pl-2'>(122)</p>
              </div>
              <p className='mt-5 text-3xl font-medium'>₹ {productData.price}</p>
              <p className='mt-4 text-gray-500 md:w-4/5'>{productData.description}</p>
               <div className='flex flex-col gap-4 my-8 '>
                  <p>Select Size</p>
                  <div className='flex gap-2'>
                  {productData.sizes.map((item, index) => {
                     return (
                         <button
                          onClick={() => setSize(item)}
                          className={`px-4 py-2 bg-gray-100 border ${item === size ? 'border-orange-500' : 'border-gray-200'}`}
                          key={index}
                          >{item}</button>
                        );
                     })}
                  </div>
               </div>
               <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
               <hr className='mt-8 sm:w-4/5 ' />
               <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                  <p>100% Original product.</p>
                  <p>Cash on delivery is available on this product</p>
                  <p>Easy return and exchange policy within 7 days.</p>
               </div>
           </div>
       </div>
        {/* reviwe section */}
        <div className='mt-20'>
           <div className='flex'>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
           </div>
           <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
             <p>
               An e-commerce website is an online platform that allows businesses and  consumers to buy and sell products or services over the internet. It provides a virtual storefront where customers can browse through a wide range of products, add them to their shopping cart, and complete the purchase using various payment methods. 
             </p>
            <p>
                E-commerce websites typically include features such as product litings, product descriptions, images and prices, shopping cart functionality, secure payment gateways, and order tracking. They may also offer customers the ability to create accounts, save their prefernces and view their order history.
            </p>
           </div>
        </div>

        {/* display releted products */}
        <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ):
  <div className='opacity-0'>

  </div>
}

export default Product