import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then((res) => setOrders(res.data));
  }, []);

  const statusColors = {
    placed: 'bg-yellow-200 text-yellow-800',
    shipped: 'bg-blue-200 text-blue-800',
    delivered: 'bg-green-200 text-green-800',
    cancelled: 'bg-red-200 text-red-800',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Order List</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Customer</th>
                <th className="border px-4 py-2 text-left">Product</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{order.customer?.name || '—'}</td>
                  <td className="border px-4 py-2">{order.product?.name || '—'}</td>
                  <td className="border px-4 py-2 text-center">{order.quantity}</td>
                  <td className="border px-4 py-2 text-center">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        statusColors[order.status] || 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
