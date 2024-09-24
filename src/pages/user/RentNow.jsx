import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RentNow = () => {
  const [instruments, setInstruments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [instrumentsPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated API call to fetch instruments
    setInstruments([
      { id: 1, name: 'Yamaha C3X Grand Piano', price: 500, description: 'Elegant grand piano', image: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Steinway_Vienna_002.JPG' },
      { id: 2, name: 'Fender Stratocaster', price: 100, description: 'Classic electric guitar', image: 'https://www.ginoguitars.com/images/products/Fender-Custom-Late-1962-Stratocaster-Relic-5732-FADB_01.jpg' },
      { id: 3, name: 'Pearl Masters Drum Kit', price: 200, description: 'Professional drum set', image: 'https://www.drumazon.com/cdn/shop/products/PEARL-MASTERS-MMX-6-PIECE-DRUM-KIT-MIDNIGHT-FADE-BLACK-HARDWARE-DRUMAZON_01_1000x.jpg?v=1598225281' },
      { id: 4, name: 'Steinway Model D Concert Grand', price: 800, description: 'Premium concert grand piano', image: 'https://michellespiano.com/wp-content/uploads/2020/07/revised3-18-scaled.jpg' },
      { id: 5, name: 'Gibson Les Paul Standard', price: 150, description: 'Iconic electric guitar', image: 'https://danvillemusic.com/cdn/shop/files/4F6A7BAB-C1B0-4324-9D6F-CF6E0A001B67.jpg?v=1710353181' },
      { id: 6, name: 'Roland V-Drums TD-27KV', price: 300, description: 'Professional electronic drum kit', image: 'https://www.kennysmusic.co.uk/news/wp-content/uploads/2021/10/0M2A6961.jpg' },
      { id: 7, name: 'Yamaha YFL-777', price: 80, description: 'Professional flute', image: 'https://www.brassandwinds.com/cdn/shop/files/Yamaha-Model-YFL-362H-Intermediate-Flute-with-B-Foot-MINT-CONDITION_800x.jpg?v=1702410734' },
      { id: 8, name: 'Madal', price: 250, description: 'Professional Deurali Chautari Madal', image: 'https://playingforchange.org/wp-content/uploads/2016/11/Madal_Drum.jpg' },
      { id: 9, name: 'Stradivarius Violin', price: 1000, description: 'Rare and valuable violin', image: 'https://ychef.files.bbci.co.uk/1280x720/p01d84g5.jpg' },
      // Add more instruments as needed
    ]);
  }, []);

  const filteredInstruments = instruments.filter(instrument =>
    instrument.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current instruments
  const indexOfLastInstrument = currentPage * instrumentsPerPage;
  const indexOfFirstInstrument = indexOfLastInstrument - instrumentsPerPage;
  const currentInstruments = filteredInstruments.slice(indexOfFirstInstrument, indexOfLastInstrument);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCardClick = (instrumentId) => {
    navigate(`/instrument/${instrumentId}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <div className="mb-6">
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search for instruments"
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
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {currentInstruments.map((instrument) => (
            <motion.div 
              key={instrument.id} 
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => handleCardClick(instrument.id)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-5">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover rounded" src={instrument.image} alt={instrument.name} />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">{instrument.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{instrument.description}</p>
                  <p className="mt-2 text-sm font-medium text-gray-900">Rs {instrument.price}/day</p>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <button
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastInstrument >= filteredInstruments.length}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstInstrument + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastInstrument, filteredInstruments.length)}
              </span>{' '}
              of <span className="font-medium">{filteredInstruments.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {[...Array(Math.ceil(filteredInstruments.length / instrumentsPerPage)).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === number + 1
                      ? 'z-10 bg-red-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastInstrument >= filteredInstruments.length}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RentNow;