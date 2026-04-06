import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUsers, FiMail, FiClock } from 'react-icons/fi';
import './Admin.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get((import.meta.env.VITE_API_URL || 'https://e-commerce-wensite.onrender.com/api') + '/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="admin-page page-enter">
      <div className="admin-header-title">
        <h1>Manage Users</h1>
        <p>View and manage registered customers and administrators</p>
      </div>

      <div className="admin-content">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{ textAlign: 'center' }}>Loading users...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No users found</td></tr>
              ) : (
                users.map(user => (
                  <tr key={user.id}>
                    <td><strong>#{user.id}</strong></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiUsers className="text-secondary" />
                        {user.name}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiMail className="text-muted" />
                        {user.email}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div className="admin-date-box">
                        <FiClock />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
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

export default AdminUsers;
