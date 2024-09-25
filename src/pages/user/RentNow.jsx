import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInstruments, imagePath } from '../../Api/api';

const RentNow = () => {
  const [instruments, setInstruments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [instrumentsPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    // All instruments
    getInstruments()
      .then((response) => {
        setInstruments(response.data.instruments);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredInstruments = instruments.filter((instrument) =>
    instrument.instrumentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current instruments
  const indexOfLastInstrument = currentPage * instrumentsPerPage;
  const indexOfFirstInstrument = indexOfLastInstrument - instrumentsPerPage;
  const currentInstruments = filteredInstruments.slice(
    indexOfFirstInstrument,
    indexOfLastInstrument
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCardClick = (instrumentId) => {
    navigate(`/instrument/${instrumentId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='mb-6'>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Search
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </div>
          <input
            type='text'
            name='search'
            id='search'
            className='focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
            placeholder='Search for instruments'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
          />
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          {currentInstruments.map((instrument) => (
            <motion.div
              key={instrument.id}
              className='bg-white overflow-hidden shadow rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105'
              onClick={() => handleCardClick(instrument.instrumentId)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}>
              <div className='p-5'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-48 w-full object-cover rounded'
                    src={imagePath + instrument.instrumentImage}
                    alt={instrument.instrumentName}
                  />
                </div>
                <div className='mt-4'>
                  <h3 className='text-lg font-medium text-gray-900'>
                    {instrument.instrumentName}
                  </h3>

                  <p className='mt-2 text-sm font-medium text-gray-900'>
                    Rs {instrument.instrumentRentalPrice}/day
                  </p>
                </div>
              </div>
              <div className='bg-gray-50 px-5 py-3'>
                <button className='w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6'>
        <div className='flex flex-1 justify-between sm:hidden'>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastInstrument >= filteredInstruments.length}
            className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
            Next
          </button>
        </div>
        <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-700'>
              Showing{' '}
              <span className='font-medium'>{indexOfFirstInstrument + 1}</span>{' '}
              to{' '}
              <span className='font-medium'>
                {Math.min(indexOfLastInstrument, filteredInstruments.length)}
              </span>{' '}
              of{' '}
              <span className='font-medium'>{filteredInstruments.length}</span>{' '}
              results
            </p>
          </div>
          <div>
            <nav
              className='isolate inline-flex -space-x-px rounded-md shadow-sm'
              aria-label='Pagination'>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                <span className='sr-only'>Previous</span>
                <ChevronLeft
                  className='h-5 w-5'
                  aria-hidden='true'
                />
              </button>
              {[
                ...Array(
                  Math.ceil(filteredInstruments.length / instrumentsPerPage)
                ).keys(),
              ].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === number + 1
                      ? 'z-10 bg-red-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }`}>
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastInstrument >= filteredInstruments.length}
                className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                <span className='sr-only'>Next</span>
                <ChevronRight
                  className='h-5 w-5'
                  aria-hidden='true'
                />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RentNow;
