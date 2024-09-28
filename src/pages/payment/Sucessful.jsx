import { Client } from '@stomp/stompjs';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, Home, Music } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { verifyPayment } from '../../Api/api';

// WebSocket client
let stompClient = null;

const Successful = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const [instrument, setInstrument] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rentalDays, setRentalDays] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to connect to WebSocket
  const connectToWebSocket = () => {
    const socket = new SockJS('http://localhost:8087/ws'); // Replace with your WebSocket endpoint
    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: onConnected,
      onError: onError,
    });

    // Activate the client to start the connection
    stompClient.activate();
  };

  const onConnected = () => {
    console.log('Connected to WebSocket');
  };

  const onError = (error) => {
    console.error('WebSocket error:', error);
  };

  // Function to send notification via WebSocket
  const sendNotification = (notification) => {
    if (stompClient && stompClient.connected) {
      const message = JSON.stringify(notification);
      stompClient.publish({
        destination: '/app/notification',
        body: message,
      });
    } else {
      console.error('STOMP client is not connected.');
    }
  };

  useEffect(() => {
    // Connect to WebSocket when component mounts
    connectToWebSocket();

    // Fetch rental and payment details from query parameters
    const pidx = queryParams.get('pidx');
    const id = queryParams.get('purchase_order_id');

    verifyPayment({ token: pidx }, id)
      .then((response) => {
        const payment = response.data.payment;
        setInstrument(payment.rental.instrument);
        setStartDate(payment.rental.rentalDate);
        setEndDate(payment.rental.returnDate);
        setTotalAmount(payment.paymentAmount);

        // Calculate rental days
        const rentalStart = new Date(payment.rental.rentalDate);
        const rentalEnd = new Date(payment.rental.returnDate);
        const days = Math.ceil(
          (rentalEnd - rentalStart) / (1000 * 60 * 60 * 24)
        );
        setRentalDays(days > 0 ? days : 1);

        // Send a notification to the WebSocket server
        const notification = {
          title: 'Rental Confirmed',
          message: `Rental of ${payment.rental.instrument.instrumentName} confirmed.`,
        };

        sendNotification(notification);
      })
      .catch((error) => {
        console.error('Error verifying payment:', error);
      });

    // Disconnect WebSocket on unmount
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [queryParams]);

  if (!instrument) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-800'>
            Error: No rental information found
          </h2>
          <button
            onClick={() => navigate('/')}
            className='mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300'>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
          <div className='p-6 sm:p-8'>
            <div className='flex items-center justify-center mb-6'>
              <CheckCircle className='h-16 w-16 text-green-500 mr-4' />
              <h2 className='text-3xl font-bold text-gray-900'>
                Payment Successful!
              </h2>
            </div>
            <p className='text-center text-gray-600 mb-8'>
              Thank you for your rental. Your order has been confirmed.
            </p>
            <div className='border-t border-gray-200 pt-6'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                Rental Details
              </h3>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <Music className='h-5 w-5 text-gray-400 mr-2' />
                  <span className='text-gray-600'>Instrument:</span>
                  <span className='ml-2 font-medium'>
                    {instrument.instrumentName}
                  </span>
                </div>
                <div className='flex items-center'>
                  <Calendar className='h-5 w-5 text-gray-400 mr-2' />
                  <span className='text-gray-600'>Start Date:</span>
                  <span className='ml-2 font-medium'>
                    {formatDate(startDate)}
                  </span>
                </div>
                <div className='flex items-center'>
                  <Calendar className='h-5 w-5 text-gray-400 mr-2' />
                  <span className='text-gray-600'>End Date:</span>
                  <span className='ml-2 font-medium'>
                    {formatDate(endDate)}
                  </span>
                </div>
                <div className='flex items-center'>
                  <Clock className='h-5 w-5 text-gray-400 mr-2' />
                  <span className='text-gray-600'>Rental Period:</span>
                  <span className='ml-2 font-medium'>{rentalDays} days</span>
                </div>
                <div className='flex items-center font-semibold'>
                  <span className='text-gray-600'>Total Amount:</span>
                  <span className='ml-2 text-lg text-red-600'>
                    Rs {totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-6 py-4 sm:px-8 sm:py-6'>
            <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4'>
              <button
                onClick={() => navigate('/user-dashboard')}
                className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
                <Home className='h-5 w-5 mr-2' />
                Return to Home
              </button>
              <button
                onClick={() => navigate('/user-dashboard')}
                className='flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
                View My Rentals
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Successful;
