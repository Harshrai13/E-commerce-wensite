import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrendingUp, FiShoppingBag, FiUsers, FiBox, FiMail } from 'react-icons/fi';

const API_URL = (import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '');

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    subscribers: 0,
    users: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, newsletterRes, usersRes] = await Promise.all([
          axios.get(`${API_URL}/products`),
          axios.get(`${API_URL}/orders`),
          axios.get(`${API_URL}/newsletter`),
          axios.get(`${API_URL}/users`)
        ]);

        const products = productsRes.data;
        const orders = ordersRes.data;
        const subscribers = newsletterRes.data;
        const users = usersRes.data;
        const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

        setStats({
          products: products.length,
          orders: orders.length,
          revenue,
          subscribers: subscribers.length,
          users: users.length
        });
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-card__info">
            <h3>Total Revenue</h3>
            <p>₹{stats.revenue.toLocaleString('en-IN')}</p>
          </div>
          <div className="admin-stat-card__icon revenue">
            <FiTrendingUp />
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card__info">
            <h3>Total Orders</h3>
            <p>{stats.orders}</p>
          </div>
          <div className="admin-stat-card__icon orders">
            <FiShoppingBag />
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card__info">
            <h3>Boutique Products</h3>
            <p>{stats.products}</p>
          </div>
          <div className="admin-stat-card__icon products">
            <FiBox />
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-card__info">
            <h3>VIP VIP List</h3>
            <p>{stats.subscribers}</p>
          </div>
          <div className="admin-stat-card__icon subscribers">
            <FiMail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
