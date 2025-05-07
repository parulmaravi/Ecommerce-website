import React, { useContext, useEffect } from 'react'
import {ShopDataContext} from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {

    const {navigate, token, setCartItems,backenddurl} = useContext(ShopDataContext);
    const [searchParams,setSearchParams]= useSearchParams();

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async()=>{
        try {
            if(!token) return null

            const res = await axios.post(`${backenddurl}/oreders/verfiStripe`,{orderId,success},{headers:{token}});

            if(res.data.success){
                setCartItems({})
                navigate('/orders')
            }
            else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
       verifyPayment()
    },[token])

  return (
    <div>
       
    </div>
  )
}

export default Verify