import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMail, FiUser, FiClock, FiStar } from 'react-icons/fi';

const API_URL = (import.meta.env.VITE_API_URL || 'https://e-commerce-wensite.onrender.com/api');

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get(`${API_URL}/newsletter`);
        setSubscribers(res.data);
      } catch (err) {
        console.error('Error fetching subscribers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  return (
    <div className="admin-page page-enter">
      <div className="admin-header-title">
        <h1>VIP VIP Subscribers</h1>
        <p>Manage your boutique's newsletter members and VIP inner circle.</p>
      </div>

      <div className="admin-content-inner">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email Address</th>
                <th>Status</th>
                <th>Subscription Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{ textAlign: 'center' }}>Loading subscribers...</td></tr>
              ) : subscribers.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: 'center' }}>No subscribers yet. Start your marketing!</td></tr>
              ) : (
                subscribers.map((email, index) => (
                  <tr key={index}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="admin-avatar" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
                          <FiUser />
                        </div>
                        <strong>{email}</strong>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge delivered">Active</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-text-muted)' }}>
                        <FiClock />
                        <em>Auto-generated</em>
                      </div>
                    </td>
                    <td>
                      <button className="btn-admin btn-admin-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        <FiStar style={{ marginRight: '5px' }} /> VIP
                      </button>
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

export default AdminSubscribers;
