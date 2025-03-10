import { Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getRentByUserId, returnInstrument } from '../../Api/api';

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
  }, [user.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setRentals((prevData) =>
        prevData.map((rental) => {
          const returnDate = new Date(rental.returnDate).getTime();
          if (returnDate < now) {
            returnInstrument(rental.id); // Call returnInstrument API
            return { ...rental, hasEnded: true }; // Add temporary flag
          } else {
            const timeLeft = returnDate - now;
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            return { ...rental, timeLeft: { days, hours, minutes, seconds } };
          }
        })
      );
    }, 1000);

    return () => clearInterval(timer);
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
                      {new Date(rental.rentalDate).toLocaleDateString()} -{' '}
                      {new Date(rental.returnDate).toLocaleDateString()}
                    </p>
                  </div>
                  {rental.timeLeft && !rental.hasEnded && (
                    <p className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6'>
                      Time Left: {rental.timeLeft.days}d {rental.timeLeft.hours}
                      h {rental.timeLeft.minutes}m {rental.timeLeft.seconds}s
                    </p>
                  )}
                  {rental.hasEnded && (
                    <p className='mt-2 flex items-center text-sm text-red-500 sm:mt-0 sm:ml-6'>
                      Rental period has ended
                    </p>
                  )}
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
