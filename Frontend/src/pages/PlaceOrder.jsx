import React, { useContext, useState } from 'react'
import TotalCart from '../components/TotalCart'
import Title from '../components/Title'
import { ShopDataContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
   const { navigate, backendUrl, products, cartItems, setcartItems, delivery_fee, getCartAmount, token, userId } = useContext(ShopDataContext)
   const [method, setMethod] = useState("COD");

   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      phone: ""
   })

   const onChangeHandller = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
         ...prevData,
         [name]: value
      }));

   };


   const onsubmitHandller = async (e) => {
      e.preventDefault();


      try {
         let orderItem = []

         for (const items in cartItems) {
            for (const item in cartItems[items]) {
               if (cartItems[items][item] > 0) {

                  const itemInfo = structuredClone(products.find(product => product._id === items));

                  if (itemInfo) {
                     itemInfo.size = item;
                     itemInfo.quantity = cartItems[items][item];
                     orderItem.push(itemInfo);
                  }
               }
            }
         }

         let orderData = {
            userId: userId,
            address: formData,
            items: orderItem,
            amount: getCartAmount() + delivery_fee,
            paymentMethod: method,
         }

         if (!orderData.userId || !orderData.items || orderData.items.length === 0) {
            toast.error("Invalid order data. Please check cart and address.");
            return;
         }


         switch (method) {
            case 'COD':
               const response = await axios.post(`${backendUrl}/api/orders/place`, orderData, { headers: { token } })
               console.log(response.data)
               if (response.data.success) {
                  setcartItems({})
                  navigate('/order')

               } else {
                  toast.error(response.data.message)
               }
               break;

            case 'stripe':
               const responseStripe = await axios.post(`${backendUrl}/api/orders/stripe`, orderData, {
                  headers: { token }
               });

               if (responseStripe.data.success) {
                  const { session_url } = responseStripe.data;
                  window.location.replace(session_url);
               } else {
                  toast.error(responseStripe.data.message);
               }
               break;

            default:
               break;
         }


      } catch (error) {
         console.log(error);
         toast.error(error.message)
      }
   }

   return (
      <form onSubmit={onsubmitHandller} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
         {/* left side */}
         <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
            <div className='text-xl sm:text-2xl my-3'>
               <Title text1={'DELIVERY'} text2={'INFORMATION'} />
            </div>
            <div className='flex gap-3'>
               <input onChange={onChangeHandller} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' required />
               <input onChange={onChangeHandller} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' required />
            </div>
            <input onChange={onChangeHandller} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' required />
            <input onChange={onChangeHandller} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' required />
            <div className='flex gap-3'>
               <input onChange={onChangeHandller} name='city' value={formData.city}
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' required />
               <input onChange={onChangeHandller} name='state' value={formData.state}
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' required />
            </div>
            <div className='flex gap-3'>
               <input onChange={onChangeHandller} name='pincode' value={formData.pincode}
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="Number" placeholder='Pincode' required />
               <input onChange={onChangeHandller} name='country' value={formData.country}
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' required />
            </div>
            <input onChange={onChangeHandller} name='phone' value={formData.phone}
               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="Number" placeholder='Phone' required />
         </div>
         {/* right side */}
         <div className='mt-8'>
            <div className='mt-8 min-w-80'>
               <TotalCart />
            </div>
            <div className='mt-12'>
               <Title text1={'PAYMENT'} text2={'METHOD'} />
               {/* Payment method */}
               <div className='flex gap-3 flex-col lg:flex-row'>
                  <div onClick={() => setMethod("stripe")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                     <p className={`min-w-3 h-3 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
                     <img className='w-10 h-10' src="https://www.citypng.com/public/uploads/preview/hd-stripe-official-logo-png-701751694777755j0aa3puxte.png" alt="" />
                  </div>
                  <div onClick={() => setMethod('COD')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                     <p className={`min-w-3 h-3 border rounded-full ${method === "COD" ? "bg-green-400" : ""}`}></p>
                     <p className='text-gray-400 '>CASH ON DELIVERY</p>
                  </div>
               </div>
               <div className='w-full text-end mt-8'>
                  <button type='submit' className='px-10 py-2 bg-black text-white '>PLACE ORDER</button>
               </div>
            </div>
         </div>
      </form>
   )
}


export default PlaceOrder