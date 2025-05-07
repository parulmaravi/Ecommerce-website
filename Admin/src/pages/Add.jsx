import React, { useState } from 'react'
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from 'react-toastify'


const Add = ({token}) => { 

  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])

  const toggleBestseller = () => setBestSeller(prev => !prev);

  const submitHandller = async(e)=>{
     e.preventDefault();

     if (!price || sizes.length === 0) {
      toast.error("Please enter product price and select at least one size.");
      return;
    }
  

     try{
       const formData = new FormData()

      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("bestSeller", bestSeller ? "true" : "false");
      formData.append("sizes",JSON.stringify(sizes));

    

      if (image1) formData.append("image1", image1)
      if (image2) formData.append("image2", image2)
      if (image3) formData.append("image3", image3)
      if (image4) formData.append("image4", image4)
  
        const response = await axios.post(`${backendUrl}/api/products/add`,formData,
         {headers: {Authorization: `Bearer ${token}`,
         'Content-Type': 'multipart/form-data',
      }})
      
      if(response.data.success){
        toast.success(response.data.message)
        setName("");
        setDescription("");
        setImage1(null);
        setImage2(null)
        setImage3(null)
        setImage4(null)
        setPrice('')
      }else{
        toast.error(response.data.message)
      }

      console.log(response.data)
     }
     catch(err){
        console.log(err.message)   
     }
  }

  return (
    <form onSubmit={submitHandller} className='flex flex-col w-full items-start gap-3 '>
      <div>
         <p className='mb-2'>Upload Image</p>
         <div className='flex gap-2'>
            <label htmlFor='image1'>
               <img className="w-20" src={!image1 ?  "/download.png" : URL.createObjectURL(image1)} alt="" />
               <input onChange={(e)=> setImage1(e.target.files[0])} type="file" id='image1' hidden/>
            </label>
            <label htmlFor='image2'>
               <img className="w-20" src={!image2 ? "/download.png" : URL.createObjectURL(image2)} alt="" />
               <input onChange={(e)=> setImage2(e.target.files[0])} type="file" id='image2' hidden/>
            </label>
            <label htmlFor='image3'>
               <img className="w-20" src={!image3 ? "/download.png" : URL.createObjectURL(image3)} alt="" />
               <input onChange={(e)=> setImage3(e.target.files[0])} type="file" id='image3' hidden/>
            </label>
            <label htmlFor='image4'>
               <img className="w-20" src={!image4 ? "/download.png" : URL.createObjectURL(image4)} alt="" />
               <input onChange={(e)=> setImage4(e.target.files[0])} type="file" id='image4' hidden/>
            </label>
         </div>
      </div>
      <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input 
          value={name}
          onChange={(e)=> setName(e.target.value)} 
          className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here'required />
      </div>
      <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea
           value={description}
           onChange={(e)=> setDescription(e.target.value)} 
          className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='write content here'required />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
         <div>
           <p className='mb-2'>Product category</p>
           <select onChange={(e)=> setCategory(e.target.value)} className='w-full px-3 py-2'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
           </select>
         </div>
         <div>
           <p className='mb-2'>Product subCategory</p>
           <select onChange={(e)=> setSubCategory(e.target.value)} className='w-full px-3 py-2'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
           </select>
         </div>

         <div>
            <p className='mb-2'>Product Price</p>
            
            <input 
            value={price}
            onChange={(e)=> setPrice(e.target.value)} className='w-ull px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
         </div>
      </div>
      <div>
          <p className='mb-2'>Product Size</p>
          <div className='flex gap-3'>
          <p onClick={() => setSizes((prev) => prev.includes("S") ? prev.filter((item) => item !== "S") : [...prev, "S"])}
           className={`${sizes.includes("S") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          
          <p onClick={() => setSizes((prev) => prev.includes("M") ? prev.filter((item) => item !== "M") : [...prev, "M"])}
           className={`${sizes.includes("M") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>

          <p onClick={() => setSizes((prev) => prev.includes("L") ? prev.filter((item) => item !== "L") : [...prev, "L"])}
           className={`${sizes.includes("L") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>

           <p onClick={() => setSizes((prev) => prev.includes("XL") ? prev.filter((item) => item !== "XL") : [...prev, "XL"])}
           className={`${sizes.includes("XL") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
            
            <p onClick={() => setSizes((prev) => prev.includes("XXL") ? prev.filter((item) => item !== "XXL") : [...prev, "XXL"])}
           className={`${sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>

             
          </div>
      </div>

      <div className='flex gap-2 mt-2'>
         <input onChange={toggleBestseller} checked={bestSeller} type="checkbox" id="bestSeller"/>
         <label className='cursor-pointer' htmlFor="bestSeller">Add to bestseller</label>
      </div>
      <button type='submit' className='w-28 py-3 mt-2 rounded text-white bg-black'>Add</button>
    </form>
   
  )
}

export default Add