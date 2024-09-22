import React, { useState } from 'react';
import Header from '../../components/Header';
import { Music, Award, Users, ChevronRight, X } from 'lucide-react';

const ValueCard = ({ icon: Icon, title, description, detailedDescription }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="relative">
      <div 
        className="bg-white p-6 rounded-lg shadow-md text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
        onClick={() => setShowDetail(true)}
      >
        <div className="relative w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full overflow-hidden">
          <Icon className="absolute inset-0 m-auto text-red-600 transition-all duration-300 group-hover:scale-110" size={48} />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-red-600 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{description}</p>
        <ChevronRight className="w-6 h-6 mx-auto mt-4 text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2" />
      </div>
      
      {showDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md relative">
            <button 
              onClick={() => setShowDetail(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition-colors duration-300"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
            <p className="text-gray-600">{detailedDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const AboutPage = () => {
  const values = [
    { 
      icon: Music, 
      title: "Passion for Music", 
      description: "We believe in the power of music to transform lives and bring joy to everyone.",
      detailedDescription: "At The Hymns, our passion for music drives everything we do. We understand that music is more than just notes on a page or sounds in the air - it's a universal language that connects people, evokes emotions, and creates lasting memories. Our team consists of musicians and music lovers who are dedicated to sharing this passion with our customers, helping them discover the joy of making music and expressing themselves through their chosen instruments."
    },
    { 
      icon: Award, 
      title: "Quality Excellence", 
      description: "We offer only the highest quality instruments and accessories to our customers.",
      detailedDescription: "Quality is at the core of our business. We meticulously select each instrument and accessory in our inventory, ensuring that it meets our rigorous standards. From beginner-friendly instruments to professional-grade equipment, we stand behind every product we sell. Our commitment to quality extends beyond just the products - it's reflected in our customer service, our store ambiance, and every interaction we have with our musical community."
    },
    { 
      icon: Users, 
      title: "Customer-Centric", 
      description: "Our customers are at the heart of everything we do, providing unparalleled service.",
      detailedDescription: "At The Hymns, the customer always comes first. We believe in building lasting relationships with our clients, understanding their unique musical journey, and providing tailored advice and support. Our staff is trained to listen attentively to customer needs, offer expert guidance, and go above and beyond to ensure customer satisfaction. From helping beginners choose their first instrument to assisting professionals in finding that perfect sound, we're committed to being a trusted partner in our customers' musical adventures."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-20 relative overflow-hidden group">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 transform transition-all duration-500 group-hover:scale-110">About The Hymns</h1>
          <p className="text-xl transform transition-all duration-500 group-hover:translate-y-2">Discover the story behind Nepal's premier music store</p>
        </div>
        <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-500 group-hover:opacity-60"></div>
        <div className="absolute inset-0 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center relative overflow-hidden">
            Our Story
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-600 transition-all duration-300 ease-in-out group-hover:w-32"></span>
          </h2>
          <div className="max-w-3xl mx-auto text-gray-600">
            <p className="mb-4 hover:text-gray-800 transition-colors duration-300">Founded in 2024, The Hymns has grown from a small family-owned shop to Nepal's premier destination for musical instruments. Our passion for music and commitment to quality have been the driving forces behind our success.</p>
            <p className="mb-4 hover:text-gray-800 transition-colors duration-300">We started with a simple goal: to provide musicians of all levels with access to the finest instruments and exceptional customer service. Today, we're proud to serve a community of music lovers across Nepal and beyond.</p>
            <p className="hover:text-gray-800 transition-colors duration-300">Our journey has been one of continuous growth and learning, always striving to bring the best musical experiences to our customers.</p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center relative overflow-hidden">
            Our Values
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-600 transition-all duration-300 ease-in-out group-hover:w-32"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center relative overflow-hidden">
            Our Team
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-600 transition-all duration-300 ease-in-out group-hover:w-32"></span>
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto hover:text-gray-800 transition-colors duration-300">Our team of experienced musicians and instrument experts are passionate about helping you find the perfect instrument and supporting your musical journey.</p>
          {/* Add team member cards here if desired */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 The Hymns. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social) => (
              <a key={social} href="#" className="hover:text-red-400 transition duration-300 transform hover:scale-110">{social}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;