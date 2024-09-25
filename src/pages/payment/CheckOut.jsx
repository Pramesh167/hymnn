import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MapPin, Phone, User } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { addRent } from '../../Api/api';

const Checkout = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const { instrument, startDate, endDate, rentalDays } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', {
      ...formData,
      instrument,
      startDate,
      endDate,
      rentalDays,
    });

    const data = {
      instrument: instrument,
      rentalDate: startDate,
      returnDate: endDate,
      rentalDays: rentalDays,
      user: user,
    };

    addRent(data)
      .then((response) => {
        toast.success('Order placed successfully');
      })
      .catch((error) => {
        toast.error('Error placing order');
      });

    navigate('/user-dashboard');
  };

  if (!instrument || !startDate || !endDate || !rentalDays) {
    return <div>Error: Missing rental information</div>;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <button
        onClick={() => navigate(-1)}
        className='flex items-center text-red-600 hover:text-red-800 mb-6'>
        <ArrowLeft className='h-5 w-5 mr-2' />
        Back to Instrument Details
      </button>

      <h1 className='text-3xl font-bold text-gray-900 mb-6'>Checkout</h1>

      <div className='bg-white shadow-lg rounded-lg overflow-hidden mb-8'>
        <div className='p-6 bg-gray-50'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            Rental Summary
          </h2>
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>Instrument:</span>
              <span className='font-medium'>{instrument.instrumentName}</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>Start Date:</span>
              <span className='font-medium'>{formatDate(startDate)}</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>End Date:</span>
              <span className='font-medium'>{formatDate(endDate)}</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>Rental Period:</span>
              <span className='font-medium'>{rentalDays} days</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>Price per Day:</span>
              <span className='font-medium'>
                Rs {instrument.instrumentRentalPrice}
              </span>
            </div>
            <div className='flex justify-between items-center text-lg font-semibold pt-2 border-t border-gray-200'>
              <span>Total:</span>
              <span>Rs {instrument.instrumentRentalPrice * rentalDays}</span>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='p-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            Personal Information
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <label
                htmlFor='firstName'
                className='block text-sm font-medium text-gray-700'>
                First Name
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='text'
                  name='firstName'
                  id='firstName'
                  required
                  className='pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm'
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='lastName'
                className='block text-sm font-medium text-gray-700'>
                Last Name
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='text'
                  name='lastName'
                  id='lastName'
                  required
                  className='pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm'
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='email'
                  name='email'
                  id='email'
                  required
                  className='pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm'
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700'>
                Phone
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Phone className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='tel'
                  name='phone'
                  id='phone'
                  required
                  className='pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm'
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className='mt-6'>
            <label
              htmlFor='address'
              className='block text-sm font-medium text-gray-700'>
              Address
            </label>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none'>
                <MapPin className='h-5 w-5 text-gray-400' />
              </div>
              <textarea
                name='address'
                id='address'
                rows='3'
                required
                className='pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm'
                value={formData.address}
                onChange={handleInputChange}></textarea>
            </div>
          </div>
        </div>

        <div className='px-6 py-4 bg-gray-50 border-t border-gray-200'>
          <p className='text-sm text-gray-600 mb-2'>
            By clicking "Rent Now," you agree to our terms and conditions.
          </p>
          <p className='text-sm text-gray-600 mb-2'>
            You can do payment while receiving your rented instrument.
          </p>
          <button
            type='submit'
            className='w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out font-semibold text-lg'>
            Rent Now - Rs {instrument.instrumentRentalPrice * rentalDays}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Checkout;
