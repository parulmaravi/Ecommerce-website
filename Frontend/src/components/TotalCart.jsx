import React, { useContext } from 'react'
import { ShopDataContext } from '../context/ShopContext'
import Title from './Title'

const TotalCart = () => {
    const {getCartAmount,delivery_fee} = useContext(ShopDataContext);
    const cartAmount = getCartAmount();
 
    return (
    <div className='w-full'>
      <div className='text-2xl'>
         <Title text1={'TOTALS'} text2={'CART'}/>
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
           <p>Subtotal</p>
           <p>₹{cartAmount}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>₹{delivery_fee}.00</p>
        </div>
      </div>
      <div className='flex justify-between'>
        <b>Total</b>
        <b>₹{(cartAmount === 0 ? 0 : Number(cartAmount) + Number(delivery_fee) )}</b>
      </div>
    </div>
  )
}

export default TotalCart