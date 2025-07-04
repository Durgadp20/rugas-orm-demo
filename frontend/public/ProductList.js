// src/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">Product List</h2>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2">{p.description}</td>
              <td className="border p-2">₹{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
