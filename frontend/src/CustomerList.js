import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('/api/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  if (customers.length === 0) {
    return <p className="text-gray-600">No customers found.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer List</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{customer.name}</td>
                <td className="px-4 py-2 border-b">{customer.email}</td>
                <td className="px-4 py-2 border-b">{customer.phone}</td>
                <td className="px-4 py-2 border-b">{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
