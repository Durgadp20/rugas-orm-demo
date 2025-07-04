import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders/stats'); // adjust if proxy is set
      setStats(res.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  if (!stats) return <p className="text-gray-500 text-center">Loading dashboard...</p>;

  const { totalOrders, totalRevenue, statusCounts } = stats;

  return (
    <div className="bg-white p-6 mt-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">📊 Order Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Order Status Count</h3>
          <ul className="text-sm space-y-1">
            {Object.entries(statusCounts).map(([status, count]) => (
              <li key={status} className="capitalize">
                {status}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
