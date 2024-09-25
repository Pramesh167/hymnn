import { User } from 'lucide-react';
import React from 'react';

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className='max-w-2xl mx-auto'>
      <h2 className='text-2xl font-bold text-gray-900 mb-4 flex items-center'>
        <User className='mr-2 text-red-600' />
         Profile
      </h2>
      <p className='text-gray-600 mb-4'>
        You'll be able to view your profile
        information here.
      </p>
      <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Profile Information
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            Personal details and preferences.
          </p>
        </div>
        <div className='border-t border-gray-200'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Full name</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {user.firstName + '' + user.lastName}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Email address
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {user.email}
              </dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Username</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {user.username}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
