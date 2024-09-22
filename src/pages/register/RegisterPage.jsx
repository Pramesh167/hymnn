// import React, { useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { Eye, EyeOff, Music } from 'lucide-react';
// import toast, { Toaster } from 'react-hot-toast';

// const countryCodes = [
//   { code: '+977', name: 'Nepal' },
//   { code: '+1', name: 'United States' },
//   { code: '+91', name: 'India' },
//   { code: '+44', name: 'United Kingdom' },
//   { code: '+61', name: 'Australia' },
//   { code: '+86', name: 'China' },
//   { code: '+81', name: 'Japan' },
//   { code: '+82', name: 'South Korea' },
//   { code: '+65', name: 'Singapore' },
//   { code: '+66', name: 'Thailand' },
//   { code: '+84', name: 'Vietnam' },
//   { code: '+62', name: 'Indonesia' },
//   { code: '+63', name: 'Philippines' },
//   { code: '+94', name: 'Sri Lanka' },
//   { code: '+880', name: 'Bangladesh' },
//   { code: '+92', name: 'Pakistan' },
//   { code: '+93', name: 'Afghanistan' },
//   { code: '+971', name: 'United Arab Emirates' },
//   { code: '+966', name: 'Saudi Arabia' },
//   { code: '+965', name: 'Kuwait' },
//   { code: '+968', name: 'Oman' },
//   { code: '+974', name: 'Qatar' },
//   { code: '+962', name: 'Jordan' },
  
// ].sort((a, b) => a.name.localeCompare(b.name));
// // 
// const RegistrationPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     countryCode: '+977',
//     phoneNumber: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [shakePhone, setShakePhone] = useState(false);
//   const lastShakeTime = useRef(0);
//   const shakeCooldown = 2000; // 2 seconds cooldown

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'phoneNumber') {
//       if (/^[0-9]*$/.test(value)) {
//         setFormData({ ...formData, [name]: value });
//       } else {
//         const currentTime = Date.now();
//         if (currentTime - lastShakeTime.current > shakeCooldown) {
//           setShakePhone(true);
//           toast.error('Invalid format', {
//             duration: 2000,
//             position: 'top-center',
//             style: {
//               background: 'rgba(255, 0, 0, 0.7)',
//               color: '#fff',
//             },
//           });
//           setTimeout(() => setShakePhone(false), 500);
//           lastShakeTime.current = currentTime;
//         }
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const validateForm = () => {
//     const emptyFields = Object.entries(formData)
//       .filter(([key, value]) => key !== 'countryCode' && value.trim() === '')
//       .map(([key]) => key);

//     if (emptyFields.length > 0) {
//       toast.error('Please fill up all the fields', {
//         duration: 3000,
//         position: 'top-center',
//       });
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       // Handle registration logic here
//       console.log('Registration submitted', formData);
//       toast.success('Registration successful!', {
//         duration: 3000,
//         position: 'top-center',
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <Toaster />
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <Music className="w-20 h-20 text-red-600" />
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Join The Hymns
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Start your musical journey today
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* First Name and Last Name fields */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   id="firstName"
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   id="lastName"
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Username field */}
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 id="username"
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Email field */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 autoComplete="email"
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Password field */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <div className="mt-1 relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   id="password"
//                   required
//                   className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password field */}
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
//               <div className="mt-1 relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   id="confirmPassword"
//                   required
//                   className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
//                 </button>
//               </div>
//             </div>

//             {/* Country Code and Phone Number fields */}
//             <div className="grid grid-cols-3 gap-2">
//               <div>
//                 <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">Country</label>
//                 <select
//                   name="countryCode"
//                   id="countryCode"
//                   className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
//                   value={formData.countryCode}
//                   onChange={handleChange}
//                 >
//                   {countryCodes.map((country) => (
//                     <option key={country.code} value={country.code}>
//                       {country.name} ({country.code})
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-span-2">
//                 <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   id="phoneNumber"
//                   className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${shakePhone ? 'animate-shake' : ''}`}
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Submit button */}
//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 Register
//               </button>
//             </div>
//           </form>

//           <p className="mt-6 text-center text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPage;


import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Music } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Flag from 'react-world-flags'; // Import for flag display

// Modified countryCodes array with ISO codes
const countryCodes = [
  { code: '+977', name: 'Nepal', iso: 'NP' },
  { code: '+1', name: 'United States', iso: 'US' },
  { code: '+91', name: 'India', iso: 'IN' },
  { code: '+44', name: 'United Kingdom', iso: 'GB' },
  { code: '+61', name: 'Australia', iso: 'AU' },
  { code: '+86', name: 'China', iso: 'CN' },
  { code: '+81', name: 'Japan', iso: 'JP' },
  { code: '+82', name: 'South Korea', iso: 'KR' },
  { code: '+65', name: 'Singapore', iso: 'SG' },
  { code: '+66', name: 'Thailand', iso: 'TH' },
  { code: '+84', name: 'Vietnam', iso: 'VN' },
  { code: '+62', name: 'Indonesia', iso: 'ID' },
  { code: '+63', name: 'Philippines', iso: 'PH' },
  { code: '+94', name: 'Sri Lanka', iso: 'LK' },
  { code: '+880', name: 'Bangladesh', iso: 'BD' },
  { code: '+92', name: 'Pakistan', iso: 'PK' },
  { code: '+93', name: 'Afghanistan', iso: 'AF' },
  { code: '+971', name: 'United Arab Emirates', iso: 'AE' },
  { code: '+966', name: 'Saudi Arabia', iso: 'SA' },
  { code: '+965', name: 'Kuwait', iso: 'KW' },
  { code: '+968', name: 'Oman', iso: 'OM' },
  { code: '+974', name: 'Qatar', iso: 'QA' },
  { code: '+962', name: 'Jordan', iso: 'JO' },
].sort((a, b) => a.name.localeCompare(b.name));

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    countryCode: '+977',
    phoneNumber: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [shakePhone, setShakePhone] = useState(false);
  const lastShakeTime = useRef(0);
  const shakeCooldown = 2000; // 2 seconds cooldown

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      if (/^[0-9]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      } else {
        const currentTime = Date.now();
        if (currentTime - lastShakeTime.current > shakeCooldown) {
          setShakePhone(true);
          toast.error('Invalid format', {
            duration: 2000,
            position: 'top-center',
            style: {
              background: 'rgba(255, 0, 0, 0.7)',
              color: '#fff',
            },
          });
          setTimeout(() => setShakePhone(false), 500);
          lastShakeTime.current = currentTime;
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const emptyFields = Object.entries(formData)
      .filter(([key, value]) => key !== 'countryCode' && value.trim() === '')
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      toast.error('Please fill up all the fields', {
        duration: 3000,
        position: 'top-center',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      console.log('Registration submitted', formData);
      toast.success('Registration successful!', {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Music className="w-20 h-20 text-red-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join The Hymns
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Start your musical journey today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First Name and Last Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Username field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>

            {/* Confirm Password field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="mt-1 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>

            {/* Country Code and Phone Number fields */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">Country</label>
                <select
                  name="countryCode"
                  id="countryCode"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.countryCode}
                  onChange={handleChange}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      <span className="inline-flex items-center">
                        <Flag code={country.iso} className="inline-block mr-2 h-4 w-6" /> {country.name} ({country.code})
                      </span>
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${shakePhone ? 'animate-shake' : ''}`}
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account? <Link to="/login" className="font-medium text-red-600 hover:text-red-500">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
