import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    sizes: [],
    bestSeller: false,
    subCategory: '',
    images: [],
  });

  const fetchList = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/products/list`);
      if (response.data.success) {
        setList(response.data.product);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateProduct = async (id) => {
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('name', editForm.name);
      formData.append('price', editForm.price);
      formData.append('category', editForm.category);
      formData.append('description', editForm.description);
      formData.append('subCategory', editForm.subCategory);
      formData.append('sizes', JSON.stringify(editForm.sizes));
      formData.append('bestSeller', editForm.bestSeller);

      editForm.images.forEach((img, i) => {
        if (img instanceof File) {
          formData.append(`image${i + 1}`, img);
        }
      });

      const response = await axios.post(`${backendUrl}/api/products/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEditingProduct(null);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/products/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2 font-bold'>All Products List</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center bg-gray-100 py-4 p-2 rounded'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {(Array.isArray(list) ? list : []).map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_3fr_1r] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
            <img className='w-12' src={item.images?.[0] || '/fallback.png'} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹ {item.price}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className='text-right md:text-center cursor-pointer text-lg'
            >
              <i className='ri-delete-bin-line'></i>
            </p>
            <p
              onClick={() => {
                setEditingProduct(item._id);
                setEditForm({
                  name: item.name,
                  price: item.price,
                  category: item.category,
                  description: item.description || '',
                  sizes: item.sizes || [],
                  bestSeller: item.bestSeller || false,
                  subCategory: item.subCategory || '',
                  images: item.images || [],
                });
              }}
              className='text-right md:text-center cursor-pointer text-lg'
            >
              <i className='ri-edit-line'></i>
            </p>
          </div>
        ))}

        {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center  justify-center bg-white/70 ">
          <div className="edit bg-zinc-100 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] shadow-lg ">
            <h3 className='font-bold mb-2'>Edit Product</h3>

            <div className='flex  gap-2 mb-4'>
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className='flex  items-center'>
                    <img
                      className='w-20 h-20 object-cover rounded'
                      src={
                        editForm.images[i]
                          ? editForm.images[i] instanceof File
                            ? URL.createObjectURL(editForm.images[i])
                            : editForm.images[i]
                          : '/download.png'
                      }
                      alt={`Image ${i + 1}`}
                    />
                    <input
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={(e) => {
                        const files = [...editForm.images];
                        files[i] = e.target.files[0];
                        setEditForm({ ...editForm, images: files });
                      }}
                    />
                  </div>
                ))}
            </div>

            <input
              className='border p-2 mb-2 w-full'
              placeholder='Name'
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
            <input
              className='border p-2 mb-2 w-full'
              placeholder='Price'
              type='number'
              value={editForm.price}
              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
            />
            <input
              className='border p-2 mb-2 w-full'
              placeholder='Category'
              value={editForm.category}
              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            />
            <input
              className='border p-2 mb-2 w-full'
              placeholder='Sub category'
              value={editForm.subCategory}
              onChange={(e) => setEditForm({ ...editForm, subCategory: e.target.value })}
            />
            <textarea
              className='border p-2 mb-2 w-full'
              placeholder='Description'
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            ></textarea>

            <div className='flex gap-2 mb-2'>
              <p>Sizes:</p>
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <p
                  key={size}
                  onClick={() =>
                    setEditForm((prev) => ({
                      ...prev,
                      sizes: prev.sizes.includes(size)
                        ? prev.sizes.filter((s) => s !== size)
                        : [...prev.sizes, size],
                    }))
                  }
                  className={`px-3 py-1 cursor-pointer ${
                    editForm.sizes.includes(size) ? 'bg-pink-200' : 'bg-gray-200'
                  }`}
                >
                  {size}
                </p>
              ))}
            </div>

            <div className='flex items-center gap-2 mb-4'>
              <input
                type='checkbox'
                checked={editForm.bestSeller}
                onChange={(e) => setEditForm({ ...editForm, bestSeller: e.target.checked })}
              />
              <label>Best Seller</label>
            </div>

            <div className='flex gap-4'>
              <button
                className='bg-blue-600 text-white px-4 py-1 rounded'
                onClick={() => updateProduct(editingProduct)}
              >
                Save
              </button>
              <button
                className='bg-gray-400 text-white px-4 py-1 rounded'
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>
            </div>
          </div>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
