import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Music } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-700 hover:text-red-600';
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold text-red-600 flex items-center">
            <Music className="h-8 w-8 mr-2" />
            The Hymns
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/" className={`${isActive('/')} transition duration-300 pb-1`}>Home</Link>
            <Link to="/about" className={`${isActive('/about')} transition duration-300 pb-1`}>About</Link>
            <Link to="/contact" className={`${isActive('/contact')} transition duration-300 pb-1`}>Contact</Link>
            <Link to="/login" className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300">
              Login
            </Link>
            <Link to="/register" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300">
              Register
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;