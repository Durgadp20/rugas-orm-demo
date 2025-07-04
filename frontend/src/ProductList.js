import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then(res => setProducts(res.data));
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Product List</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Picture</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                  <td className="py-2 px-4 border">{p.name}</td>
                  <td className="py-2 px-4 border">{p.category}</td>
                  <td className="py-2 px-4 border">₹{p.price}</td>
                  <td className="py-2 px-4 border">
                    {p.picture ? (
                      <img src={p.picture} alt={p.name} className="h-12 w-12 object-cover rounded" />
                    ) : (
                      <span className="text-sm text-gray-400 italic">No image</span>
                    )}
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
