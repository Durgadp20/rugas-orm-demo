import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderForm({ onOrderCreated }) {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({ customer: '', product: '', quantity: 1 });

  useEffect(() => {
    axios.get('/api/customers').then(res => setCustomers(res.data));
    axios.get('/api/products').then(res => setProducts(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/orders', {
        customer: order.customer,
        product: order.product,
        quantity: order.quantity,
        status: 'placed',
      });
      setOrder({ customer: '', product: '', quantity: 1 });
      onOrderCreated();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || 'Failed to create order');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Create New Order</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          className="border p-2 rounded"
          value={order.customer}
          onChange={(e) => setOrder({ ...order, customer: e.target.value })}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={order.product}
          onChange={(e) => setOrder({ ...order, product: e.target.value })}
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          className="border p-2 rounded"
          placeholder="Quantity"
          value={order.quantity}
          onChange={(e) =>
            setOrder({ ...order, quantity: parseInt(e.target.value) || 1 })
          }
          required
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 col-span-1 md:col-span-2">
          Submit Order
        </button>
      </form>
    </div>
  );
}
