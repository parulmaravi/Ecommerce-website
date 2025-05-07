import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import  {jwtDecode} from 'jwt-decode'

export const ShopDataContext = createContext();

const ShopCotext = ({children}) => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setcartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate()
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const addToCart = async(itemId,size) =>{
       if(!size){
          toast.error('Select Product Size');
          return;
       }
      let cartData = structuredClone(cartItems);
      if(cartData[itemId]){
        if(cartData[itemId][size]){
          cartData[itemId][size] += 1;
        }
        else{
          cartData[itemId][size] = 1;
        }
      }
      else{
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }
      setcartItems(cartData);

      if(token){
         try {
            const response=  await axios.post(backendUrl + '/api/carts/add',{itemId,size},{headers:{token}});
            if(response.data.success){
               toast.success(response.data.message)
            }
         } catch (error) {
           console.log(error)
           toast.error(error.message)
         }
      }
    }
 
    const getProducts = async()=>{
        try {
           const response = await axios.post(`${backendUrl}/api/products/list`);
            
           if(response.data.success){
               setProducts(response.data.product)
               
           }
           else{
              toast.error(response.data.message)
           }
           
        } catch (error) {
           console.error(error);
           toast.error(error.message);
        }
    }

     const getCartCount = ()=>{
       let totalCount = 0;
        for(const items in cartItems){
          for(const item in cartItems[items]){
            try{
              if(cartItems[items][item] > 0){
                totalCount += cartItems[items][item]
              }
            }
            catch(error){
              console.error("error in getCartCount",error)
            }
          }
        }
        return totalCount;
     }
    
     const updateCart = async (itemId, sizes, quantity, userId) => {
      let cartData = structuredClone(cartItems);
    
      if (!cartData[itemId]) {
        cartData[itemId] = {}; 
      }
      
      cartData[itemId][sizes] = quantity;
      setcartItems(cartData);
    
      if (token) {
        try {
          await axios.post(`${backendUrl}/api/carts/update`, { userId, itemId, sizes, quantity }, { headers: { token } });
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    
      
      const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
          const itemInfo = products.find((product)=> product._id === itemId)
          
          if (!itemInfo) {
            console.error(`Product not found for ID: ${itemId}`);
            continue;
          }
      
          for (const size in cartItems[itemId]) {
            try {
              const quantity = cartItems[itemId][size];
              if (quantity > 0) {
                totalAmount += itemInfo.price * quantity;
              }
            } catch (error) {
              console.error("Error in cart calculation", error);
            }
          }
        }
        return totalAmount;
      };
      

     const getUserCart = async(token)=>{
        try {
          if (!token || token.split('.').length !== 3) {
            console.error("Invalid or missing token:", token);
            toast.error("Session expired or invalid login. Please login again.");
            return;
          }
      
            const decoded = jwtDecode(token);
            const userId = decoded.userId;
            const response = await axios.post(`${backendUrl}/api/carts/get`,{userId},{headers:{token}});

            

            if (response.data.success) {
              setcartItems(response.data.cartData);
            } else {
              toast.error(response.data.message || "Failed to fetch cart.");
            }
            
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
     }
     

    

    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
          setToken(localStorage.getItem('token'));
          getUserCart(localStorage.getItem('token'));
        }
    },[])

    useEffect(() => {
      if (token && token.split('.').length === 3) {
        try {
          const decoded = jwtDecode(token);
          setUserId(decoded.userId);
        } catch (err) {
          console.error("Token decoding failed:", err.message);
          toast.error("Invalid session. Please login again.");
          setToken('');
          localStorage.removeItem('token');
          navigate('/login'); // or wherever your login route is
        }
      } else {
        console.warn("Invalid token format:", token);
      }
    }, [token]);
    

    useEffect(()=>{
       getProducts()
    },[])

  return (
   <ShopDataContext.Provider value={{getProducts,products, setProducts , delivery_fee,search,setSearch,getCartCount,showSearch,setShowSearch,cartItems,setcartItems,addToCart,updateCart,getCartAmount,navigate,backendUrl,token,setToken,userId}}>
     {children}
   </ShopDataContext.Provider>
  )
}

export default ShopCotext