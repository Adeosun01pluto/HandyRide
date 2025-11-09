// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const RiderRegister = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     vehicleType: '',
//     vehicleNumber: '',
//     licenseNumber: ''
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Basic validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       // Get existing riders
//       const riders = JSON.parse(localStorage.getItem('registeredRiders') || '[]');
      
//       // Check if email already exists
//       if (riders.some(rider => rider.email === formData.email)) {
//         setError('Email already registered');
//         return;
//       }

//       // Create new rider
//       const newRider = {
//         id: Math.random().toString(36).substr(2, 9),
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//         vehicleType: formData.vehicleType,
//         vehicleNumber: formData.vehicleNumber,
//         licenseNumber: formData.licenseNumber,
//         createdAt: new Date().toISOString()
//       };

//       // Save to localStorage
//       riders.push(newRider);
//       localStorage.setItem('registeredRiders', JSON.stringify(riders));

//       // Redirect to login
//       navigate('/rider-login');
//     } catch (err) {
//         console.log(err)
//       setError('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Register as a Rider
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Or{' '}
//             <button
//               onClick={() => navigate('/rider-login')}
//               className="font-medium text-blue-600 hover:text-blue-500"
//             >
//               sign in to your account
//             </button>
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}
//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 required
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
//               <select
//                 id="vehicleType"
//                 name="vehicleType"
//                 required
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={formData.vehicleType}
//                 onChange={handleChange}
//               >
//                 <option value="">Select vehicle type</option>
//                 <option value="Motorcycle">Motorcycle</option>
//                 <option value="Car">Car</option>
//                 <option value="Tricycle">Tricycle</option>
//               </select>
//             </div>
//             <div>
//               <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700">Vehicle Number</label>
//               <input
//                 id="vehicleNumber"
//                 name="vehicleNumber"
//                 type="text"
//                 required
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={formData.vehicleNumber}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">License Number</label>
//               <input
//                 id="licenseNumber"
//                 name="licenseNumber"
//                 type="text"
//                 required
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={formData.licenseNumber}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 required
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RiderRegister;














































import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RiderRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    matric: '',
    department: '',
    level: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    vehicleType: '',
    vehicleNumber: '',
    licenseNumber: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const riders = JSON.parse(localStorage.getItem('registeredRiders') || '[]');

      if (riders.some(rider => rider.email === formData.email)) {
        setError('Email already registered');
        return;
      }

      const newRider = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        matric: formData.matric,
        department: formData.department,
        level: formData.level,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        vehicleType: formData.vehicleType,
        vehicleNumber: formData.vehicleNumber,
        licenseNumber: formData.licenseNumber,
        profile: {
          photo: '',      // to be set on profile page
          bio: '',
          nearestBusStop: ''
        },
        vehicles: [],      // added on “Register Your Bike/Car”
        createdAt: new Date().toISOString()
      };

      riders.push(newRider);
      localStorage.setItem('registeredRiders', JSON.stringify(riders));

      // Auto-login then go to profile setup
      localStorage.setItem('riderAuth', 'true');
      localStorage.setItem('currentRiderId', newRider.id);
      navigate('/rider-profile');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register as a Rider
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              onClick={() => navigate('/rider-login')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your account
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            {/* Student fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input name="name" required className="input" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Student Matric</label>
              <input name="matric" required className="input" value={formData.matric} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input name="department" required className="input" value={formData.department} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Level</label>
                <select name="level" required className="input" value={formData.level} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>100</option><option>200</option><option>300</option>
                  <option>400</option><option>500</option><option>600</option>
                </select>
              </div>
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <input name="email" type="email" required className="input" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input name="phone" type="tel" required className="input" value={formData.phone} onChange={handleChange} />
            </div>

            {/* Optional pre-vehicle (you can keep or remove) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                <select name="vehicleType" className="input" value={formData.vehicleType} onChange={handleChange}>
                  <option value="">Select vehicle type</option>
                  <option>Motorcycle</option><option>Car</option><option>Tricycle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
                <input name="vehicleNumber" className="input" value={formData.vehicleNumber} onChange={handleChange} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">License Number</label>
              <input name="licenseNumber" className="input" value={formData.licenseNumber} onChange={handleChange} />
            </div>

            {/* Password */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input name="password" type="password" required className="input" value={formData.password} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input name="confirmPassword" type="password" required className="input" value={formData.confirmPassword} onChange={handleChange} />
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RiderRegister;

/* Tailwind helpers used above:
.input => "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-sm"
.btn-primary => "group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
*/
