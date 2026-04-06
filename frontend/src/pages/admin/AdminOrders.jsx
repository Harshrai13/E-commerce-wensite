import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'https://e-commerce-wensite.onrender.com/api');

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/orders`);
      setOrders(res.data.reverse()); // latest first
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_URL}/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('Error updating status');
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '24px' }}>Manage Orders</h2>
      
      <div className="admin-content-inner">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Payment</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" style={{ textAlign: 'center' }}>Loading orders...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center' }}>No orders found</td></tr>
              ) : (
                orders.map(order => (
                  <tr key={order.orderId}>
                    <td><strong>{order.orderId}</strong></td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div>
                        <strong>{order.address.fullName}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>{order.address.city}</div>
                      </div>
                    </td>
                    <td>{order.paymentMethod || 'COD'}</td>
                    <td><strong>₹{(order.total || 0).toLocaleString('en-IN')}</strong></td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <select 
                        className="status-select" 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
