import React, { useState } from 'react';
import axios from 'axios';

function ProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', formData);
      alert('Product added!');
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
      });
      if (onProductAdded) onProductAdded();
    } catch (err) {
      alert('Error adding product');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Add Product</h2>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 mb-2 w-full" />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2 mb-2 w-full" />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 mb-2 w-full" />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 mb-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
    </form>
  );
}

export default ProductForm;
