import React from 'react'

const NewStellerBox = () => {
    const submitHandler = (e)=>{
        e.preventDefault()
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        <form onSubmit={submitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3 border border-gray-400'>
            <input type="email" placeholder='Enter your email'
             className='w-full sm:flex-1 outline-none ' required
            />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>CLICK </button>
        </form>
    </div>
  )
}

export default NewStellerBox