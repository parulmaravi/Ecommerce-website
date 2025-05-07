import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Order = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return null
    try {
      const response = await axios.post(backendUrl + '/api/orders/list', {}, { headers: {  Authorization: `Bearer ${token}` } })
      console.log(response.data)

      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (e, orderId) => {
    const token = localStorage.getItem("token");
    try {

      const response = await axios.post(
        backendUrl + '/api/orders/status',
        { orderId, status: e.target.value },
        { headers: {  Authorization: `Bearer ${token}` } }
      );
  
      console.log('Status update response:', response.data);
  
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message || 'Failed to update status');
      }
    } catch (error) {
      console.log('Error updating status:', error);
      toast.error(error.message);
    }
  };
  

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          Array.isArray(orders) && orders.length > 0 ? orders.map((order, index) => {
            return (
              <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
                <img className='w-20' src="https://www.pngfind.com/pngs/m/131-1312918_png-file-svg-product-icon-transparent-png.png" alt="" />
                <div>
                  <div>
                    {
            
                      Array.isArray(order.items) && order.items.length > 0 ?
                        order.items.map((item, index) => {
                          return (
                            <p className='py-0.5' key={index}>
                              {item.name} * {item.quantity} <br />
                              <span>{item.size}</span>
                            </p>
                          )
                        })
                        : <p>No items available</p> 
                    }
                  </div>
                  <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                  <div>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.pincode}</p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <div>
                  <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                  <p className='mt-3'> Method: {order.paymentMethod}</p>
                  <p>Payment: {order.payment ? 'Done ' : 'Pending'}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className='texm-sm sm:text-[15px]'>₹{order.amount}</p>
                <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='p-2 font-semibold'>
                  <option value="OrderPlaced">OrderPlaced</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            )
          }) : <p>No orders available</p>
        }
      </div>
    </div>
  )
}

export default Order
