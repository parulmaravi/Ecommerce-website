import React, { useContext } from 'react'
import {Link} from 'react-router-dom'

const ProductItem = ({_id,image,name,price}) => {
  

  return (
    <Link to={`/product/${_id}`} className='text-gray-700 cursor-pointer'>
       <div className='overflow-hidden'>
       <img className="hover:scale-110 ease-in-out" src={image} alt={name} />
        </div> 
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>₹ {price}</p>
    </Link>
  )
}

export default ProductItem