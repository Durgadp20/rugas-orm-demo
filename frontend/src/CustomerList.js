import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Delete customer handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting customer:", err);
      alert("Failed to delete the customer.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Customer List</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : customers.length === 0 ? (
        <p className="text-gray-500">No customers available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Address</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id} className="odd:bg-white even:bg-gray-50">
                  <td className="py-2 px-4 border">{c.name}</td>
                  <td className="py-2 px-4 border">{c.email}</td>
                  <td className="py-2 px-4 border">{c.phone}</td>
                  <td className="py-2 px-4 border">{c.address}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDelete(c._id)}
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
  );
}
