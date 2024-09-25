import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getAllRent } from '../../Api/api';

const Dashboard = ({ addNotification }) => {
  const [reportType, setReportType] = useState('daily');
  const [rentalData, setRentalData] = useState([]);

  useEffect(() => {
    getAllRent()
      .then((response) => {
        console.log(response.data);
        setRentalData(response.data.rentals);
      })
      .catch((error) => {
        console.error(error);
      });

    const timer = setInterval(() => {
      setRentalData((prevData) =>
        prevData.map((rental) => {
          if (rental.timeLeft > 0 && !rental.rentEnded) {
            return { ...rental, timeLeft: rental.timeLeft - 1 };
          } else if (
            rental.timeLeft === 0 &&
            !rental.notificationSent &&
            !rental.rentEnded
          ) {
            addNotification(
              `Rental timer for ${rental.username}'s ${rental.instrument} has ended`
            );
            return { ...rental, timeLeft: 0, notificationSent: true };
          }
          return rental;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [addNotification]);

  const formatTime = (seconds) => {
    if (seconds <= 0) return '00:00:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndRent = (id) => {
    setRentalData((prevData) =>
      prevData.map((rental) =>
        rental.id === id ? { ...rental, rentEnded: true, timeLeft: 0 } : rental
      )
    );
  };

  const filteredRentalData =
    reportType === 'daily'
      ? rentalData.filter((rental) => !rental.rentEnded)
      : rentalData;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-gray-800'>Rental Dashboard</h2>
        <div className='flex bg-gray-200 rounded-lg p-1'>
          <button
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              reportType === 'daily'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-gray-700'
            }`}
            onClick={() => setReportType('daily')}>
            Daily Report
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              reportType === 'allTime'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-gray-700'
            }`}
            onClick={() => setReportType('allTime')}>
            All Time Report
          </button>
        </div>
      </div>

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
                      rental.rentEnded
                        ? 'bg-gray-50'
                        : rental.timeLeft === 0
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
                      {rental.rentalDate}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {rental.returnDate}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap font-mono'>
                      <div className='flex items-center'>
                        <Clock
                          className='mr-2 text-blue-500'
                          size={16}
                        />
                        {Date.now() < new Date(rental.returnDate).getTime()
                          ? formatTime(rental.returnDate - Date.now())
                          : '00:00:00'}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {rental.rentEnded ? (
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                          <CheckCircle
                            className='mr-1'
                            size={16}
                          />{' '}
                          Completed
                        </span>
                      ) : rental.timeLeft === 0 ? (
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
                        disabled={rental.rentEnded}
                        className={`px-4 py-2 rounded-md transition-all duration-300 ${
                          rental.rentEnded
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-md'
                        }`}>
                        {rental.rentEnded ? 'Rent Ended' : 'End Rent'}
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
