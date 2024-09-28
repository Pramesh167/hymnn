import { Client } from '@stomp/stompjs'; // Use this instead of 'stompjs'
import {
  Bell,
  ChevronRight,
  FileText,
  Home,
  LogOut,
  Menu,
  ShoppingBag,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';

import toast, { Toaster } from 'react-hot-toast';
import Notifications from '../../components/Notification';
import Dashboard from './Dashboard';
import Products from './Product';
import Request from './Request';

// WebSocket client
let stompClient = null;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

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
    stompClient.subscribe('/topic/notifications', (message) => {
      console.log('Received notification:', message.body);
      const notify = JSON.parse(message.body);
      toast.success(notify.message, {
        duration: 3000,
        position: 'top-center',
      });
      const notification = message.body;
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: Date.now(), message: notification, isRead: false },
      ]);
    });
  };

  const onError = (error) => {
    console.error('WebSocket error:', error);
  };

  useEffect(() => {
    connectToWebSocket();

    return () => {
      if (stompClient) {
        stompClient.deactivate(); // Cleanup the WebSocket connection on unmount
      }
    };
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Products', icon: ShoppingBag },
    { name: 'Requests', icon: FileText },
    { name: 'Notifications', icon: Bell },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Products':
        return <Products />;
      case 'Requests':
        return <Request />;
      case 'Notifications':
        return (
          <Notifications
            notifications={notifications}
            setNotifications={setNotifications}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className='flex h-screen bg-gray-100 overflow-hidden'>
      <Toaster />
      {/* Sidebar */}
      <aside
        className={`bg-red-600 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-all duration-300 ease-in-out z-30`}>
        <nav>
          <div className='flex justify-between items-center px-4 pb-6'>
            <h2 className='text-2xl font-semibold'>Admin Panel</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className='md:hidden transition-transform duration-300 hover:rotate-90'>
              <X size={24} />
            </button>
          </div>
          {sidebarItems.map((item) => (
            <a
              key={item.name}
              href='#'
              className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-red-700 hover:text-white ${
                activeTab === item.name ? 'bg-red-700' : ''
              }`}
              onClick={() => setActiveTab(item.name)}>
              <item.icon
                className='mr-2'
                size={20}
              />
              <span>{item.name}</span>
              {item.name === 'Notifications' && notifications.length > 0 && (
                <span className='ml-auto bg-white text-red-600 rounded-full px-2 py-1 text-xs'>
                  {notifications.length}
                </span>
              )}
              <ChevronRight
                className={`ml-auto transition-transform duration-200 ${
                  activeTab === item.name ? 'rotate-90' : ''
                }`}
                size={16}
              />
            </a>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className='flex items-center w-full py-2.5 px-4 rounded transition duration-200 hover:bg-red-700 hover:text-white text-left'>
          <LogOut
            className='mr-2'
            size={20}
          />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Header */}
        <header className='bg-white shadow-md z-20'>
          <div className='flex items-center justify-between px-4 py-3'>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className='md:hidden text-gray-500 focus:outline-none focus:text-gray-700 transition-transform duration-300 hover:rotate-180'>
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className='text-xl font-semibold text-gray-800'>
              The Hymns Admin
            </h2>
            <div className='flex items-center'>
              <span className='text-sm text-gray-600'>Welcome, Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 transition-all duration-300 ease-in-out'>
          <div className='container mx-auto px-6 py-8'>{renderContent()}</div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden'
          onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </div>
  );
};

export default AdminDashboard;
