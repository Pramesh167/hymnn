import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const RentHistory = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch rent history
    setRentals([
      { id: 1, name: 'Yamaha C3X Grand Piano', startDate: '2023-09-15', endDate: '2023-09-20', status: 'Returned' },
      { id: 2, name: 'Fender Stratocaster', startDate: '2023-09-10', endDate: '2023-09-12', status: 'Returned' },
      { id: 3, name: 'Pearl Masters Drum Kit', startDate: '2023-09-05', endDate: '2023-09-08', status: 'Returned' },
      // Add more rental history items as needed
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Rental History</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {rentals.map((rental) => (
            <li key={rental.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-red-600 truncate">{rental.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {rental.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      {rental.startDate} - {rental.endDate}
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