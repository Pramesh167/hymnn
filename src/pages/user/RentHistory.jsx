import { Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getRentByUserId } from '../../Api/api';

const RentHistory = () => {
  const [rentals, setRentals] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Simulated API call to fetch rent history
    getRentByUserId(user.id)
      .then((response) => {
        setRentals(response.data.rentals);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2 className='text-2xl font-bold text-gray-900 mb-4'>Rental History</h2>
      <div className='bg-white shadow overflow-hidden sm:rounded-md'>
        <ul
          role='list'
          className='divide-y divide-gray-200'>
          {rentals.map((rental) => (
            <li key={rental.id}>
              <div className='px-4 py-4 sm:px-6'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium text-red-600 truncate'>
                    {rental.instrument.instrumentName}
                  </p>
                  <div className='ml-2 flex-shrink-0 flex'>
                    <p className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                      {rental.status}
                    </p>
                  </div>
                </div>
                <div className='mt-2 sm:flex sm:justify-between'>
                  <div className='sm:flex'>
                    <p className='flex items-center text-sm text-gray-500'>
                      <Clock
                        className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                      {rental.rentalDate} - {rental.returnDate}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RentHistory;
