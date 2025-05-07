import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopDataContext } from '../context/ShopContext';
import axios from 'axios';

const Order = () => {
  const { backendUrl, token } = useContext(ShopDataContext);

  const [orderData, setOrderData] = useState([]);

  const localOrderData = async () => {
    try {
      if (!token) {
        return console.log("Token is undefined");
      }

      const response = await axios.post(`${backendUrl}/api/orders/userOrder`, {}, { headers: { token } });
     

      if (response.data.success) {
        let allOrdersItem = [];
        if (Array.isArray(response.data.orders)) {
          response.data.orders.forEach((order) => {
            if (Array.isArray(order.items)) {
              order.items.forEach((item) => {
                item['status'] = order.status;
                item['payment'] = order.payment;
                item['date'] = new Date(order.date); 
                allOrdersItem.push(item);
              });
            }
          });
          setOrderData(allOrdersItem.reverse()); 
        } else {
          console.error('Orders are not in the expected format');
        }
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    localOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-center gap-6 text-sm'>
                <img className="w-16 sm:w-20" src={item.images?.[0]} alt={item.name} />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 text-base text-gray-400'>
                    <p className='text-lg'>₹ {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-2'>
                    Date: <span className='text-gray-400'>{new Date(item.date).toLocaleDateString()}</span>
                  </p>
                  <p className='mt-2'>
                    Method: <span className='text-gray-400'>{item.method}</span>
                  </p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
                  <p className='text-sm md:text-base'>Ready To Ship</p>
                </div>
                <button onClick={localOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Order;
