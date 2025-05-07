import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {ShopDataContext} from '../context/ShopContext'

const Navbar = () => {
    const [visiable, setVisiable] = useState(false);
    const {setShowSearch, getCartCount,token,setToken,navigate ,setcartItems} = useContext(ShopDataContext)

    const logout = async()=>{
       localStorage.removeItem('token');
       setToken('');
       setcartItems({});
       navigate('/login')
    }
  return (
    <div className='flex items-center justify-between py-5 font-medium '>
        <Link to='/'>
           <img src="/src/logo.png" alt="" className='w-36' />
        </Link>
        
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
          <NavLink  to="/" className="flex flex-col items-center gap-1 group">
          <p>HOME</p>
          <hr  className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
          </NavLink>
          <NavLink to='/collection' className="flex flex-col items-center  group gap-1">
               <p>COLLECTION</p>
               <hr  className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
          </NavLink>
          <NavLink to='/about' className="flex flex-col items-center  group gap-1">
               <p>ABOUT</p>
               <hr  className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
          </NavLink>
          <NavLink to='/contact' className="flex flex-col items-center  group gap-1">
               <p>CONTACT</p>
               <hr  className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
          </NavLink>
        
        </ul>
        <div className='flex items-center gap-6'>
             <i onClick={()=> setShowSearch(true)} className="text-xl cursor-pointer ri-search-line"></i>

             <div className=' relative group'>
  
              <i onClick={()=> token ? null: navigate('/login')} className="text-xl  cursor-pointer ri-user-line"></i>
               {/* Drop down */}
               {
                 token && 
                 <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                  <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p onClick={()=> navigate('/order')} className='cursor-pointer hover:text-black'>Order</p>
                    <p onClick={ ()=> logout()} className='cursor-pointer hover:text-black'>Logout</p>
                </div>
               </div>
               }
             </div>
             <Link to='/cart' className='relative'>
             <i className="text-xl ri-shopping-bag-line"></i>
             <p className='absolute right-[-5px] bottom-[-4px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
             </Link>
             <i onClick={()=> setVisiable(true)} className="lg:hidden ri-menu-3-line"></i>
        </div>
        {/* sidebar menu for small screen */}
        <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${visiable ? 'w-full':'w-0'}`} >
            <div  className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisiable(false)} className='flex item-center gap-4 p-3 cursor-pointer'>
                <i className="text-2xl ri-arrow-drop-left-line"></i>
                <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisiable(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                <NavLink onClick={()=>setVisiable(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={()=>setVisiable(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                <NavLink onClick={()=>setVisiable(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar