import { Client } from '@stomp/stompjs';
import { Bell, Clock, LogOut, Music, ShoppingCart, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Notifications from '../../components/Notification';
import AddRents from './AddRents';
import EditProfile from './EditProfile';
import RentHistory from './RentHistory';
import RentNow from './RentNow';

// WebSocket client
let stompClient = null;

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rentNow');
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

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
    // Subscribe to notifications topic
    stompClient.subscribe(
      `/user/${user.username}/queue/notifications`, // Use the appropriate user identifier (username or user ID)
      (message) => {
        toast.success('New notification received!', {
          duration: 3000,
          position: 'top-center',
        });
        const newNotification = JSON.parse(message.body); // Parse the incoming notification
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          {
            id: Date.now(), // Unique ID for the notification (you can replace with a real ID from the server)
            message: newNotification.message, // Assuming the notification contains a 'message' field
          },
        ]);
      }
    );
  };

  const onError = (error) => {
    console.error('WebSocket error:', error);
  };

  // WebSocket connection
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Assuming the user is stored in localStorage
    if (!user) {
      navigate('/login');
      return;
    }

    connectToWebSocket();

    return () => {
      if (stompClient) {
        stompClient.deactivate(); // Cleanup the WebSocket connection on unmount
      }
    };
  }, [navigate, connectToWebSocket]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'rentNow':
        return <RentNow />;
      case 'rentHistory':
        return <RentHistory />;
      case 'addRents':
        return <AddRents />;
      case 'notifications':
        return (
          <Notifications
            notifications={notifications}
            setNotifications={setNotifications}
          />
        );
      case 'editProfile':
        return <EditProfile />;
      default:
        return <RentNow />;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <Toaster />
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-gray-900 flex items-center'>
            <Music className='h-8 w-8 text-red-600 mr-2' />
            The Hymns
          </h1>
          <button
            onClick={handleLogout}
            className='flex items-center text-red-600 hover:text-red-800 transition duration-150 ease-in-out'>
            <LogOut className='h-5 w-5 mr-1' />
            Logout
          </button>
        </div>
      </header>

      <nav className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              {[
                'rentNow',
                'rentHistory',
                'addRents',
                'notifications',
                'editProfile',
              ].map((tab) => (
                <button
                  key={tab}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-red-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } ${tab === 'notifications' ? 'relative' : ''}`}
                  onClick={() => setActiveTab(tab)}>
                  {tab === 'rentNow' && (
                    <ShoppingCart className='h-5 w-5 mr-1' />
                  )}
                  {tab === 'rentHistory' && <Clock className='h-5 w-5 mr-1' />}
                  {tab === 'addRents' && (
                    <ShoppingCart className='h-5 w-5 mr-1' />
                  )}
                  {tab === 'notifications' && <Bell className='h-5 w-5 mr-1' />}
                  {tab === 'editProfile' && <User className='h-5 w-5 mr-1' />}
                  {tab.charAt(0).toUpperCase() +
                    tab
                      .slice(1)
                      .replace(/([A-Z])/g, ' $1')
                      .trim()}
                  {tab === 'notifications' && notifications.length > 0 && (
                    <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                      {notifications.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        {renderTabContent()}
      </main>
    </div>
  );
};

export default UserDashboard;
