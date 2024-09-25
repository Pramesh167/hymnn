import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  changeInstrumentStatus,
  getUserInstruments,
  imagePath,
} from '../../Api/api';

const Request = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getUserInstruments()
      .then((response) => {
        setRequests(response.data.instruments);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [expandedRequest, setExpandedRequest] = useState(null);

  const handleApprove = (id) => {
    changeInstrumentStatus(id)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReject = (id) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: 'rejected' } : request
      )
    );
  };

  const toggleExpand = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };

  return (
    <div className='max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md'>
      <h2 className='text-3xl font-bold text-gray-900 mb-6'>
        Manage User Requests
      </h2>
      <div className='space-y-4'>
        {requests.map((request) => (
          <motion.div
            key={request.id}
            className='border border-gray-200 rounded-lg overflow-hidden'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            <div
              className='flex items-center justify-between p-4 cursor-pointer'
              onClick={() => toggleExpand(request.instrumentId)}>
              <div className='flex items-center space-x-4'>
                <img
                  src={imagePath + request.instrumentImage}
                  alt={request.instrumentName}
                  className='h-16 w-16 object-cover rounded-md'
                />
                <div>
                  <h3 className='text-lg font-semibold'>
                    {request.instrumentName}
                  </h3>
                  {/* <p className="text-sm text-gray-600">Requested by: {request.userName}</p> */}
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    request.added
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}></span>
                {expandedRequest === request.instrumentId ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </div>
            </div>
            <AnimatePresence>
              {expandedRequest === request.instrumentId && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className='px-4 pb-4'>
                  <p className='text-sm text-gray-700 mb-2'>
                    {request.description}
                  </p>
                  <p className='text-sm font-semibold mb-4'>
                    Price per day: NPR {request.instrumentRentalPrice}
                  </p>
                  {!request.added && (
                    <div className='flex space-x-2'>
                      <button
                        onClick={() => handleApprove(request.instrumentId)}
                        className='flex items-center px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300'>
                        <Check
                          size={16}
                          className='mr-1'
                        />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.instrumentId)}
                        className='flex items-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300'>
                        <X
                          size={16}
                          className='mr-1'
                        />
                        Reject
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Request;
