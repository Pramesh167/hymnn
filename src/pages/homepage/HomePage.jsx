import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { Music, ShoppingCart, Headphones, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RentInstrumentCard = ({ name, image, pricePerDay }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={image} alt={name} className="w-full h-48 object-cover mb-4 rounded" />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-red-600 mt-2 font-bold">NPR {pricePerDay.toLocaleString()} / day</p>
      <button
        onClick={() => navigate('/login')}
        className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
      >
        Rent Now
      </button>
    </motion.div>
  );
};

const ServiceCard = ({ icon: Icon, title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="bg-red-700 p-6 rounded-lg text-white cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
      layout
    >
      <div className="flex items-center justify-between">
        <Icon size={32} />
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </div>
      <h3 className="text-xl font-semibold my-2">{title}</h3>
      <AnimatePresence>
        {isOpen && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-cover bg-center h-96 flex items-center relative" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover Your Sound</h1>
          <p className="text-xl text-white mb-8">Explore our collection of premium musical instruments</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="bg-red-600 text-white py-3 px-8 rounded-full hover:bg-red-700 transition duration-300"
          >
            Shop Now
          </motion.button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Featured Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { name: 'Harmonium', letter: 'H' },
              { name: 'Yun Lo', letter: 'Y' },
              { name: 'Madal', letter: 'M' },
              { name: 'Naqara', letter: 'N' },
              { name: 'Saxophone', letter: 'S' }
            ].map((category) => (
              <motion.div 
                key={category.name} 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-red-600">{category.letter}</span>
                </div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rent an Instrument */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Rent an Instrument</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: "Yamaha C3X Grand Piano", image: "https://example.com/piano.jpg", pricePerDay: 5000 },
              { name: "Fender Stratocaster", image: "https://example.com/guitar.jpg", pricePerDay: 1000 },
              { name: "Pearl Masters Drum Kit", image: "https://example.com/drums.jpg", pricePerDay: 2000 },
              { name: "Stradivarius Violin", image: "https://example.com/violin.jpg", pricePerDay: 1500 }
            ].map((instrument, index) => (
              <RentInstrumentCard key={index} {...instrument} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Music, title: "Expert Advice", description: "Get personalized recommendations from our team of music experts." },
              { icon: ShoppingCart, title: "Instrument Rentals", description: "Try before you buy with our flexible rental programs." },
              { icon: Headphones, title: "Maintenance & Repair", description: "Keep your instruments in perfect condition with our professional services." }
            ].map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">About Us</h3>
              <p>The Hymns is Nepal's premier musical instrument retailer, offering a wide range of high-quality instruments and exceptional customer service.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Shop', 'Rentals', 'Services', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item === 'Contact' ? '/contact' : '/login');
                      }}
                      className="hover:text-red-400 transition duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <p>123 Music Street, Kathmandu, Nepal</p>
              <p>Phone: +977 1 234 5678</p>
              <p>Email: info@thehymns.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social) => (
                  <a key={social} href="#" className="hover:text-red-400 transition duration-300">{social}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 The Hymns. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;