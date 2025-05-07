import React from 'react'
import Title from '../components/Title'
import NewStellerBox  from '../components/NewStellerBox'

const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 bprder-t '>
         <Title text1={"CONTECT"} text2={"US"} />
       </div>
       <div className='my-10 flex flex-col justify-center md:flex-row gap-15 mb-28'>
         <img className='w-96 md:max-w-[480px]' src="/contact_img-CyOum2vk.png" alt="" />
        <div className='flex flex-col justify-center items-strat gap-6'>
          <p className='font-semibold text-xl'>Our Store</p>
          <p className='text-gray-500'>54709 Willms Station
          Suite 350, Washington, USA</p>
          <p className='text-gray-500'>Tel: (415) 555-0132
          Email: admin@forever.com </p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings</p>
           <button className='border border-black px-6 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
       </div>
       <NewStellerBox/>
    </div>
  )
}

export default Contact