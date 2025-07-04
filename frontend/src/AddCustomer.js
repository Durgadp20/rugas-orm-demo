import React, { useState } from 'react';
import axios from 'axios';

function AddCustomer({ onCustomerAdded }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/customers', form);
      alert('✅ Customer added!');
      setForm({ name: '', email: '', phone: '', address: '' });
      onCustomerAdded(); // refresh list
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-semibold mb-2">Add Customer</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="block mb-2 p-2 border w-full" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="block mb-2 p-2 border w-full" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="block mb-2 p-2 border w-full" />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="block mb-2 p-2 border w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}

export default AddCustomer;
