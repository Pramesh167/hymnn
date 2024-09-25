import { Eye, EyeOff, Music } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../Api/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors

    if (email === 'admin@gmail.com' && password === 'admin') {
      // Admin login successful
      console.log('Admin login successful');
      navigate('/admin-dashboard'); // Redirect to admin dashboard
    } else {
      loginUser({ email, password })
        .then((response) => {
          console.log('User login successful', response);
          // set token
          const user = JSON.stringify(response.data.user);
          localStorage.setItem('user', user);
          navigate('/user-dashboard'); // Redirect to user dashboard
        })
        .catch((error) => {
          toast.error(error.response.error);
          setError(error.response.data.message);
        });
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Google login initiated');
    // For demonstration, let's assume Google login always succeeds as a regular user
    navigate('/user-dashboard');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center'>
          <Music className='w-20 h-20 text-red-600' />
        </div>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Welcome back to The Hymns
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Your musical journey continues here
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form
            className='space-y-6'
            onSubmit={handleSubmit}>
            {error && (
              <div
                className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
                role='alert'>
                <span className='block sm:inline'>{error}</span>
              </div>
            )}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'>
                Email address
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='mt-1 relative'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='current-password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
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

            <div className='flex items-center justify-between'>
              <div className='text-sm'>
                <Link
                  to='/forgot-password'
                  className='font-medium text-red-600 hover:text-red-500'>
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out'>
                Sign in
              </button>
            </div>
          </form>

          <p className='mt-6 text-center text-sm text-gray-600'>
            Not a member?{' '}
            <Link
              to='/register'
              className='font-medium text-red-600 hover:text-red-500'>
              Start your musical journey
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
