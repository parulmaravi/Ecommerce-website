import React from 'react'

const Navbar = ({setToken}) => {

  const handleLogout = () => {
    // Clear token from localStorage and reset state
    localStorage.removeItem('token');
    setToken("");
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-24' src="/logo.png" alt="" />
       
        <button onClick={handleLogout} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar