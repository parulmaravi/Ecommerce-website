import React from 'react'
import{ NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-300'>
       <div className='flex flex-col gap-3 pt-6 pl-[20%] text-[15px]'>
          <NavLink className="flex items-center gap-3 border border-gray-200 border-r-0 px-3 py-2 rounded" to='/add'>
          <i className="text-xl ri-add-circle-line"></i>
          <p className='hidden md:block'>Add item</p>
          </NavLink>
          <NavLink className="flex items-center gap-3 border border-gray-200 border-r-0 px-3 py-2 rounded" to='/list'>
          <i className="text-xl ri-task-line"></i>
          <p className='hidden md:block'>List item</p>
          </NavLink>
          <NavLink className="flex items-center gap-3 border border-gray-200 border-r-0 px-3 py-2 rounded" to='/order'>
          <i className="text-xl ri-task-line"></i>
          <p className='hidden md:block'>Orders </p>
          </NavLink>
       </div>
    </div>
  )
}

export default Sidebar