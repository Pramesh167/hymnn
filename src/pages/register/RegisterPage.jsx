import { Eye, EyeOff, Music } from 'lucide-react';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { registerUser } from '../../Api/api';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => value.trim() === '')
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      toast.error('Please fill up all the fields', {
        duration: 3000,
        position: 'top-center',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      console.log('Registration submitted', formData);
      registerUser(formData)
        .then((response) => {
          toast.success('Registration successful!', {
            duration: 3000,
            position: 'top-center',
          });
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            duration: 3000,
            position: 'top-center',
          });
        });
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <Toaster />
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center'>
          <Music className='w-20 h-20 text-red-600' />
        </div>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Join The Hymns
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Start your musical journey today
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form
            className='space-y-6'
            onSubmit={handleSubmit}>
            {/* First Name and Last Name fields */}
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-700'>
                  First Name
                </label>
                <input
                  type='text'
                  name='firstName'
                  id='firstName'
                  required
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium text-gray-700'>
                  Last Name
                </label>
                <input
                  type='text'
                  name='lastName'
                  id='lastName'
                  required
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Username field */}
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium text-gray-700'>
                Username
              </label>
              <input
                type='text'
                name='username'
                id='username'
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                autoComplete='email'
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='mt-1 relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  required
                  className='block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className='h-5 w-5 text-gray-500' />
                  ) : (
                    <Eye className='h-5 w-5 text-gray-500' />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password field */}
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700'>
                Confirm Password
              </label>
              <div className='mt-1 relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  id='confirmPassword'
                  required
                  className='block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff className='h-5 w-5 text-gray-500' />
                  ) : (
                    <Eye className='h-5 w-5 text-gray-500' />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
                Register
              </button>
            </div>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-sm'>
              Already have an account?{' '}
              <Link
                to='/login'
                className='font-medium text-red-600 hover:text-red-500'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
