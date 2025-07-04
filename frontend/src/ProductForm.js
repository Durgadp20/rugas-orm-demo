import React, { useState } from 'react';
import axios from 'axios';

export default function ProductForm({ onProductAdded }) {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    picture: '',
    price: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', product);
      setProduct({
        name: '',
        category: '',
        description: '',
        picture: '',
        price: ''
      });
      onProductAdded();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || 'Failed to add product');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          required
        />
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Picture URL"
          value={product.picture}
          onChange={(e) => setProduct({ ...product, picture: e.target.value })}
        />
        <input
          type="number"
          min="0"
          className="border p-2 rounded"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
        />
        <textarea
          className="border p-2 rounded col-span-1 md:col-span-2"
          placeholder="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          required
        ></textarea>
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 col-span-1 md:col-span-2">
          Add Product
        </button>
      </form>
    </div>
  );
}
