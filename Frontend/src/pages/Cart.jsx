import React, { useContext, useEffect, useState } from 'react'
import { ShopDataContext } from '../context/ShopContext'
import TotalCart from '../components/TotalCart';
import Title from '../components/Title';

const Cart = () => {
  const { products, cartItems, updateCart, navigate } = useContext(ShopDataContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    if(products.length >0){
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              id: productId,         
              size: size,           
              quantity: cartItems[productId][size],
            });
          }
        }
      }
    }
   setCartData(tempData);
  }, [cartItems,products]);

  return (
    <div className='border-t pt-14 '>
      <div className='text-2xl mb-3'>
        <Title text1={"YOUR "} text2={"CART"} />
      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item.id);

            
            if (!productData) {
              console.warn("Product not found for ID:", item.id);
              return null;
            }

            return (
              <div
                key={index}
                className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
              >
                <div className='flex items-start gap-4'>
                  <img
                    className='w-16 sm:w-20'
                    src={Array.isArray(productData.images?.[0]) ? productData.images?.[0] : productData.images?.[0]}
                    alt={productData.name}
                  />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>₹ {productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || Number(value) === 0) {
                      return; 
                    }
                    updateCart(item.id, item.size, Number(value));
                  }}
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                  type='number'
                  min={1}
                  defaultValue={item.quantity}
                />
                <i
                  onClick={() => updateCart(item.id, item.size, 0)}
                  className='text-xl ri-delete-bin-line'
                ></i>
              </div>
            );
          })
        }
      </div>

      <div className='flex justify-end my-20 '>
        <div className='w-full sm:w-[450px]'>
          <TotalCart />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate("/place-order")}
              className='px-8 py-3 my-8 text-white bg-black'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
