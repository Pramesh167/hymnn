import React, { useState } from 'react';
import Header from '../../components/Header';
import { Send, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-20 relative overflow-hidden group">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 transform transition-all duration-500 group-hover:scale-110">Contact Us</h1>
          <p className="text-xl transform transition-all duration-500 group-hover:translate-y-2">Get in touch with The Hymns team</p>
        </div>
        <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-500 group-hover:opacity-60"></div>
        <div className="absolute inset-0 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-6">We'd love to hear from you. Please feel free to contact us with any questions or inquiries.</p>
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: "123 Music Street, Kathmandu, Nepal" },
                  { icon: Phone, text: "+977 1 234 5678" },
                  { icon: Mail, text: "info@thehymns.com" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <item.icon className="text-red-600 mr-4 group-hover:scale-110 transition-transform duration-300" size={24} />
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: "name", label: "Name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "message", label: "Message", type: "textarea" }
                ].map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-gray-700 mb-1">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

{/* Map Section */}
<section className="py-16 bg-gray-100">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Visit Our Store</h2>
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.260677101557!2d85.33700937620029!3d27.710901025615624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1990a6c6aa3f%3A0xd9d1affd3945c802!2sBajeko%20Sekuwa!5e0!3m2!1sen!2snp!4v1702585261682!5m2!1sen!2snp&markers=color:red%7Clabel:H%7C27.710901,85.339198"
        width="100%" 
        height="450" 
        style={{border:0}} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
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

export default ContactPage;