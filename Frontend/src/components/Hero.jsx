import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* hero left */}
        <div className='w-full sm:w-1/2 flex sm:fles-row items-center justify-center sm:py-0'>
           <div className='text-[#414141]'>
              <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium texl-sm md:text-base'>OUR BESTSELLERS</p>
              </div>
              <h1 className='pt-serif-regular text-3xl sm:py-3 lg:text-5xl'>Latest Arrivals</h1>
              <div className='flex items-center gap-2'>
                 <p className='font-medium  sm:py-3 lg:text-base md:text-base'>SHOP NOW</p>
                 <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
              </div>
           </div>
        </div>
        {/* hero right */}
        <img className='w-full sm:w-1/2' src="https://foreverbuy.in/assets/hero_img-DOCOb6wn.png" alt="" />
    </div>
  )
}

export default Hero