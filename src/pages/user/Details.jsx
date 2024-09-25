import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getInstrumentById, imagePath } from '../../Api/api';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rentalDays, setRentalDays] = useState(1);

  // Mock data - in a real application, you'd fetch this data based on the id
  const [instrument, setInstrument] = useState({});

  useEffect(() => {
    getInstrumentById(id)
      .then((response) => {
        console.log(response.data);
        setInstrument(response.data.instrument);
      })
      .catch((error) => {
        console.error(error);
      });
    // Calculate rental days whenever start or end date changes
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    setRentalDays(days > 0 ? days : 1);
  }, [startDate, endDate, id]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // If the new start date is after the current end date, update the end date
    if (date > endDate) {
      setEndDate(date);
    }
  };

  const handleRent = () => {
    // Navigate to the checkout page with instrument and rental information
    navigate('/checkout', {
      state: { instrument, startDate, endDate, rentalDays },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <button
        onClick={() => navigate(-1)}
        className='flex items-center text-red-600 hover:text-red-800 mb-6'>
        <ArrowLeft className='h-5 w-5 mr-2' />
        Back to Instruments
      </button>

      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='md:flex'>
          <div className='md:flex-shrink-0'>
            <img
              className='h-96 w-full object-cover md:w-96'
              src={imagePath + instrument.instrumentImage}
              alt={instrument.instrumentName}
            />
          </div>
          <div className='p-8'>
            <div className='uppercase tracking-wide text-sm text-red-600 font-semibold'>
              {instrument.instrumentType}
            </div>
            <h1 className='mt-1 text-4xl font-bold text-gray-900 leading-tight'>
              {instrument.instrumentName}
            </h1>

            <div className='mt-2 flex items-center'>
              <Clock className='h-5 w-5 text-gray-400' />
              <span className='ml-2 text-gray-600'>
                Condition: {instrument.instrumentCondition}
              </span>
            </div>
            {/* 
            <div className='mt-2 flex items-center'>
              <Calendar className='h-5 w-5 text-gray-400' />
              <span className='ml-2 text-gray-600'>
                Available from: {Date.now().toFixed()}
              </span>
            </div> */}

            <div className='mt-6'>
              <div className='flex items-center'>
                <span className='text-3xl font-bold text-gray-900'>
                  Rs {instrument.instrumentRentalPrice}
                </span>
                <span className='ml-2 text-gray-600'>/ day</span>
              </div>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='startDate'
                  className='block text-sm font-medium text-gray-700'>
                  Rental Start Date
                </label>
                <DatePicker
                  id='startDate'
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm'
                />
              </div>
              <div>
                <label
                  htmlFor='endDate'
                  className='block text-sm font-medium text-gray-700'>
                  Rental End Date
                </label>
                <DatePicker
                  id='endDate'
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm'
                />
              </div>
            </div>

            <div className='mt-4'>
              <label
                htmlFor='rentalDays'
                className='block text-sm font-medium text-gray-700'>
                Rental Period
              </label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <input
                  type='number'
                  name='rentalDays'
                  id='rentalDays'
                  className='focus:ring-red-500 focus:border-red-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300'
                  value={rentalDays}
                  readOnly
                />
                <span className='inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                  days
                </span>
              </div>
            </div>

            <div className='mt-6'>
              <button
                onClick={handleRent}
                className='w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out'>
                Rent Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Details;
