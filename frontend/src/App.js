import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import Dashboard from './Dashboard';

function CustomersPage() {
  return (
    <div className="space-y-4">
      <CustomerForm />
      <CustomerList />
    </div>
  );
}

function ProductsPage() {
  const [reloadProducts, setReloadProducts] = useState(false);
  const handleProductAdded = () => setReloadProducts(!reloadProducts);

  return (
    <div className="space-y-4">
      <ProductForm onProductAdded={handleProductAdded} />
      <ProductList key={reloadProducts} />
    </div>
  );
}

function OrdersPage() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const handleOrderCreated = () => setReloadOrders(!reloadOrders);

  return (
    <div className="space-y-4">
      <OrderForm onOrderCreated={handleOrderCreated} />
      <OrderList key={reloadOrders} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Nav Bar */}
        <nav className="bg-white shadow mb-6">
          <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-blue-700">Rugas ORM Demo</h1>
            <div className="flex flex-wrap gap-3">
              <NavLink
                to="/customers"
                className={({ isActive }) =>
                  `px-4 py-2 rounded transition ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`
                }
              >
                Customers
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `px-4 py-2 rounded transition ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `px-4 py-2 rounded transition ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`
                }
              >
                Orders
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-4 py-2 rounded transition ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`
                }
              >
                Dashboard
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<CustomersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
