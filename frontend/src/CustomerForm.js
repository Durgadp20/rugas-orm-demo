import React, { useState } from 'react';
import axios from 'axios';

export default function CustomerForm() {
  const [customer, setCustomer] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/customers', customer);
      setCustomer({ name: '', address: '', phone: '', email: '' });
      alert('Customer added successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to add customer');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Customer</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          placeholder="Phone"
          type="tel"
          required
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="address"
          value={customer.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
