import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Request = () => {
  const [requests, setRequests] = useState([
    { id: 1, userName: 'John Doe', instrumentName: 'Fender Stratocaster', description: 'Vintage electric guitar, great condition', price: 100, image: 'https://example.com/strat.jpg', status: 'pending' },
    { id: 2, userName: 'Jane Smith', instrumentName: 'Yamaha Grand Piano', description: 'Professional grade grand piano', price: 500, image: 'https://example.com/piano.jpg', status: 'pending' },
    { id: 3, userName: 'Mike Johnson', instrumentName: 'Pearl Drum Kit', description: 'Complete drum set, barely used', price: 200, image: 'https://example.com/drums.jpg', status: 'pending' },
  ]);

  const [expandedRequest, setExpandedRequest] = useState(null);

  const handleApprove = (id) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'approved' } : request
    ));
  };

  const handleReject = (id) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'rejected' } : request
    ));
  };

  const toggleExpand = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Manage Rental Requests</h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <motion.div
            key={request.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleExpand(request.id)}>
              <div className="flex items-center space-x-4">
                <img src={request.image} alt={request.instrumentName} className="h-16 w-16 object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-semibold">{request.instrumentName}</h3>
                  <p className="text-sm text-gray-600">Requested by: {request.userName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  request.status === 'approved' ? 'bg-green-100 text-green-800' :
                  request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
                {expandedRequest === request.id ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>
            <AnimatePresence>
              {expandedRequest === request.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4"
                >
                  <p className="text-sm text-gray-700 mb-2">{request.description}</p>
                  <p className="text-sm font-semibold mb-4">Price per day: NPR {request.price}</p>
                  {request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
                      >
                        <Check size={16} className="mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="flex items-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                      >
                        <X size={16} className="mr-1" />
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