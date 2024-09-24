import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, ShoppingCart, Clock, User, LogOut, Bell } from 'lucide-react';
import RentNow from './RentNow';
import RentHistory from './RentHistory';
import AddRents from './AddRents';
import Notifications from '../../components/Notification';
import EditProfile from './EditProfile';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rentNow');
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your rental for Yamaha C3X Grand Piano is due in 2 days." },
    { id: 2, message: "Fender Stratocaster is now available for rent." },
    // Add more notifications as needed
  ]);

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'rentNow':
        return <RentNow />;
      case 'rentHistory':
        return <RentHistory />;
      case 'addRents':
        return <AddRents />;
      case 'notifications':
        return <Notifications notifications={notifications} setNotifications={setNotifications} />;
      case 'editProfile':
        return <EditProfile />;
      default:
        return <RentNow />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Music className="h-8 w-8 text-red-600 mr-2" />
            The Hymns
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
          >
            <LogOut className="h-5 w-5 mr-1" />
            Logout
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <button
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeTab === 'rentNow' ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                onClick={() => setActiveTab('rentNow')}
              >
                <ShoppingCart className="h-5 w-5 mr-1" />
                Rent Now
              </button>
              <button
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeTab === 'rentHistory' ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                onClick={() => setActiveTab('rentHistory')}
              >
                <Clock className="h-5 w-5 mr-1" />
                Rent History
              </button>
              <button
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeTab === 'addRents' ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                onClick={() => setActiveTab('addRents')}
              >
                <ShoppingCart className="h-5 w-5 mr-1" />
                Add Rents
              </button>
              <button
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeTab === 'notifications' ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="h-5 w-5 mr-1" />
                Notifications
              </button>
              <button
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeTab === 'editProfile' ? 'border-red-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                onClick={() => setActiveTab('editProfile')}
              >
                <User className="h-5 w-5 mr-1" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default UserDashboard;