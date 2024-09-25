import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getAllRent } from '../../Api/api';

const Dashboard = ({ addNotification }) => {
  const [reportType, setReportType] = useState('daily');
  const [rentalData, setRentalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await getAllRent();
        setRentalData(response.data.rentals);
      } catch (error) {
        console.error(error);
        setError('Failed to load rental data.');
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();

    const timer = setInterval(() => {
      const now = Date.now();

      setRentalData((prevData) =>
        prevData.map((rental) => {
          const returnDate = new Date(rental.returnDate).getTime();
          if (returnDate < now) {
            // addNotification(
            //   `Rental timer for ${rental.user.username}'s ${rental.instrument.instrumentName} has ended`
            // );
            return { ...rental, hasEnded: true }; // Add temporary flag
          } else {
            return rental; // Return the rental as is if not completed
          }
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [addNotification]);

  const formatTime = (returnDate) => {
    const timeLeft = new Date(returnDate).getTime() - Date.now();
    if (timeLeft <= 0) return '00:00:00';
    const hours = Math.floor(timeLeft / 3600000);
    const minutes = Math.floor((timeLeft % 3600000) / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleEndRent = (id) => {
    setRentalData((prevData) =>
      prevData.map((rental) =>
        rental.id === id ? { ...rental, hasEnded: true } : rental
      )
    );
  };

  const filteredRentalData =
    reportType === 'daily'
      ? rentalData.filter((rental) => !rental.hasEnded)
      : rentalData;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-gray-800'>Rental Dashboard</h2>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className='text-red-500'>{error}</div>}

      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                {[
                  'Username',
                  'Instrument',
                  'Start Date',
                  'End Date',
                  'Time Left',
                  'Status',
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
                {filteredRentalData.map((rental) => (
                  <motion.tr
                    key={rental.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className={
                      rental.hasEnded
                        ? 'bg-gray-50'
                        : new Date(rental.returnDate) < Date.now()
                        ? 'bg-red-50'
                        : ''
                    }>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {rental.user.username}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {rental.instrument.instrumentName}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {new Date(rental.rentalDate).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {new Date(rental.returnDate).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap font-mono'>
                      <div className='flex items-center'>
                        <Clock
                          className='mr-2 text-blue-500'
                          size={16}
                        />
                        {formatTime(rental.returnDate)}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {new Date(rental.returnDate) < Date.now() ? (
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                          <AlertCircle
                            className='mr-1'
                            size={16}
                          />{' '}
                          Overdue
                        </span>
                      ) : (
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                          <Clock
                            className='mr-1'
                            size={16}
                          />{' '}
                          Active
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <button
                        onClick={() => handleEndRent(rental.id)}
                        disabled={rental.hasEnded}
                        className={`px-4 py-2 rounded-md transition-all duration-300 ${
                          rental.hasEnded
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-md'
                        }`}>
                        {rental.hasEnded ? 'Rent Ended' : 'End Rent'}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
