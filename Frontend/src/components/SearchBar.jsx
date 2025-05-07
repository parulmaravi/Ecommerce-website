import React, { useContext, useEffect, useState } from 'react'
import {ShopDataContext} from '../context/ShopContext'
import { useLocation } from 'react-router-dom';
const SearchBar = () => {

const {search,setSearch,showSearch,setShowSearch} = useContext(ShopDataContext);
const [visiable, setVisiable] = useState(false);
const location = useLocation();

useEffect(()=>{
    if(location.pathname.includes('collection') && showSearch){
      setVisiable(true);
    }
    else{
        setVisiable(false)
    }
},[location])

  return showSearch && visiable ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
          <input
           value={search} 
           onChange={(e)=> setSearch(e.target.value)}
           className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
           <i className="text-xl ri-search-line"></i>
        </div>
        <i onClick={()=> setShowSearch(false)} className="inline text-xl cursor-pointer ri-close-line"></i>
    </div>
  ): null
}

export default SearchBar