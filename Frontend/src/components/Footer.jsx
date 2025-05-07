import React from 'react'

const Footer = () => {
  return (
   <>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
     <div>
    <img src="logo.png" alt="" className='mb-5 w-32' />
    <p className='w-full md:w-2/3 text-gray-600'>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
    </p>
  </div>

  <div>
    <p className='font-medium text-xl mb-5'>COMPANY</p>
    <ul className='flex flex-col gap-1 text-gray-600'>
      <li>Home</li>
      <li>About us</li>
      <li>Delivery</li>
      <li>Privacy Policy</li>
    </ul>
  </div>

  <div>
    <p className='font-medium text-xl mb-5'>CONTACT</p>
    <ul className='flex flex-col gap-1 text-gray-600'>
      <li>+1-000-000-0000</li>
      <li>website@gmail.com</li>
      <li>Instagram</li>
    </ul>
  </div>
</div>

{/* Bottom copyright section */}
<div className='flex flex-col items-center justify-center w-full'>
  <hr className='text-gray-400 w-full' />
  <p className='text-sm py-5 text-center text-gray-500'>
    © 2025 forever.dev — All Rights Reserved.
  </p>
</div>
   </>
  )
}
export default Footer