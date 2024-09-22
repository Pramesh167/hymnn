import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, X } from 'lucide-react';

const Notifications = ({ notifications, setNotifications }) => {
  const markAsReturned = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    // You should also update the Products component to reflect this change
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <Bell className="mr-2 text-red-600" />
          Notifications
        </h2>
        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
          {notifications.length} New
        </span>
      </div>
      
      {notifications.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 text-center py-8"
        >
          No notifications at this time.
        </motion.p>
      ) : (
        <AnimatePresence>
          <motion.div className="space-y-4" variants={containerVariants}>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={itemVariants}
                layout
                className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500"
              >
                <div className="flex justify-between items-start">
                  <p className="text-gray-800 flex-grow">{notification.message}</p>
                  <button 
                    onClick={() => markAsReturned(notification.id)}
                    className="ml-4 text-gray-400 hover:text-gray-600 transition duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => markAsReturned(notification.id)}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-200 flex items-center justify-center"
                >
                  <CheckCircle size={16} className="mr-2" />
                  Mark as Returned
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default Notifications;