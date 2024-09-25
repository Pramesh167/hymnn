import { AnimatePresence, motion } from 'framer-motion';
import { Edit, Plus, Trash, Upload, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import {
  addInstrument,
  getInstruments,
  imagePath,
  saveImage,
} from '../../Api/api';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getInstruments()
      .then((response) => {
        console.log('Instruments fetched', response.data);
        setProducts(response.data.instruments);
      })
      .catch((error) => {
        console.error('Error fetching instruments', error);
      });
  }, []);

  const [newProduct, setNewProduct] = useState({
    name: '',
    image: null,
    category: '',
    dailyRate: 0,
    availability: 'Available',
    condition: '',
  });

  const [imageName, setImageName] = useState('');

  const [isFormVisible, setIsFormVisible] = useState(false);
  const fileInputRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);

      saveImage(formData)
        .then((response) => {
          console.log('Image uploaded', response.data);
          setImageName(response.data.image_name);
        })
        .catch((error) => {
          console.error('Error uploading image', error);
        });
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const data = {
      instrumentName: newProduct.name,
      instrumentImage: imageName,
      instrumentType: newProduct.category,
      instrumentRentalPrice: newProduct.dailyRate,
      instrumentRentalStatus: newProduct.availability,
      instrumentCondition: newProduct.condition,
      addedByUser: false,
    };
    addInstrument(data)
      .then((response) => {
        console.log('Instrument added', response.data);
        toast.success('Instrument added successfully');
      })
      .catch((error) => {
        console.error('Error adding instrument', error);
      });

    setIsFormVisible(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-gray-800'>
          Manage Rental Instruments
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center'
          onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? (
            <X
              size={20}
              className='mr-2'
            />
          ) : (
            <Plus
              size={20}
              className='mr-2'
            />
          )}
          {isFormVisible ? 'Cancel' : 'Add New Instrument'}
        </motion.button>
      </div>

      {/* Add Product Form */}
      <AnimatePresence>
        {isFormVisible && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleAddProduct}
            className='mb-8 bg-white p-6 rounded-lg shadow-lg overflow-hidden'>
            <h3 className='text-xl font-semibold mb-4'>
              Add New Rental Instrument
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Instrument Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className='border p-2 rounded-md w-full focus:ring-2 focus:ring-red-500 focus:border-transparent'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='category'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Category
                </label>
                <input
                  type='text'
                  id='category'
                  name='category'
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className='border p-2 rounded-md w-full focus:ring-2 focus:ring-red-500 focus:border-transparent'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='dailyRate'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Daily Rental Rate (NPR)
                </label>
                <input
                  type='number'
                  id='dailyRate'
                  name='dailyRate'
                  value={newProduct.dailyRate}
                  onChange={handleInputChange}
                  className='border p-2 rounded-md w-full focus:ring-2 focus:ring-red-500 focus:border-transparent'
                  step='0.01'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='condition'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Condition
                </label>
                <select
                  id='condition'
                  name='condition'
                  value={newProduct.condition}
                  onChange={handleInputChange}
                  className='border p-2 rounded-md w-full focus:ring-2 focus:ring-red-500 focus:border-transparent'
                  required>
                  <option value=''>Select Condition</option>
                  <option value='Excellent'>Excellent</option>
                  <option value='Good'>Good</option>
                  <option value='Fair'>Fair</option>
                  <option value='Poor'>Poor</option>
                </select>
              </div>
              <div className='md:col-span-2'>
                <label
                  htmlFor='image'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Instrument Image
                </label>
                <input
                  type='file'
                  id='image'
                  name='image'
                  onChange={handleImageUpload}
                  className='hidden'
                  ref={fileInputRef}
                  accept='image/*'
                  required
                />
                <div className='flex items-center justify-center w-full'>
                  <label
                    htmlFor='image'
                    className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300'>
                    {newProduct.image ? (
                      <img
                        src={newProduct.image}
                        alt='Preview'
                        className='w-full h-full object-cover rounded-lg'
                      />
                    ) : (
                      <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                        <Upload className='w-10 h-10 mb-3 text-gray-400' />
                        <p className='mb-2 text-sm text-gray-500'>
                          <span className='font-semibold'>Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className='text-xs text-gray-500'>
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type='submit'
              className='mt-6 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center justify-center'>
              <Plus
                size={20}
                className='mr-2'
              />
              Add Instrument
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Products Table */}
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              {[
                'Image',
                'Name',
                'Category',
                'Daily Rate',
                'Availability',
                'Condition',
                'Actions',
              ].map((header) => (
                <th
                  key={header}
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            <AnimatePresence>
              {products.map((product) => (
                <motion.tr
                  key={product.instrumentId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <img
                      src={imagePath + product.instrumentImage}
                      alt={product.name}
                      className='h-12 w-12 rounded-full object-cover'
                    />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {product.instrumentName}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {product.instrumentType}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    NPR {product.instrumentRentalPrice}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {product.instrumentRentalStatus}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {product.instrumentCondition}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className='text-blue-600 hover:text-blue-900 mr-3'>
                      <Edit size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className='text-red-600 hover:text-red-900'
                      onClick={() => handleDeleteProduct(product.id)}>
                      <Trash size={20} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Products;
