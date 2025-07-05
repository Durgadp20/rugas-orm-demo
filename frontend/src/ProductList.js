import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete the product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Rugas ORM Demo</h1>
      <nav className="mb-6 flex space-x-4">
        <a href="/customers" className="text-purple-600 hover:text-purple-800 font-medium">Customers</a>
        <a href="/products" className="text-purple-600 hover:text-purple-800 font-medium">Products</a>
        <a href="/orders" className="text-purple-600 hover:text-purple-800 font-medium">Orders</a>
        <a href="/dashboard" className="text-purple-600 hover:text-purple-800 font-medium">Dashboard</a>
      </nav>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Product List</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded">
              <thead className="bg-purple-100 text-purple-800">
                <tr>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Category</th>
                  <th className="py-2 px-4 border">Price</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                    <td className="py-2 px-4 border">{p.name}</td>
                    <td className="py-2 px-4 border">{p.category}</td>
                    <td className="py-2 px-4 border">₹{p.price}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
