import { NavLink, Outlet } from 'react-router-dom';
import { FiHome, FiBox, FiList, FiTrendingUp, FiLogOut, FiUsers, FiMail, FiPercent } from 'react-icons/fi';
import './Admin.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <div className="admin-logo">
            <span>BOUTIQUE</span>
            <span>ADMIN EDITION</span>
          </div>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin" end className={({isActive}) => `admin-nav__link ${isActive ? 'active' : ''}`}>
            <FiTrendingUp title="Dashboard" /> Dashboard
          </NavLink>
          <NavLink to="/admin/orders" className={({isActive}) => `admin-nav__link ${isActive ? 'active' : ''}`}>
            <FiList title="Orders" /> Orders
          </NavLink>
          <NavLink to="/admin/products" className={({isActive}) => `admin-nav__link ${isActive ? 'active' : ''}`}>
            <FiBox title="Products" /> Products
          </NavLink>
          <NavLink to="/admin/users" className={({isActive}) => `admin-nav__link ${isActive ? 'active' : ''}`}>
            <FiUsers title="Customers" /> Customers
          </NavLink>
          <NavLink to="/admin/promos" className={({isActive}) => `admin-nav__link ${isActive ? 'active' : ''}`}>
            <FiPercent title="Promo Codes" /> Promo Codes
          </NavLink>
          <NavLink to="/admin/subscribers" className={({isActive}) => `admin-nav__link ${isActive ? 'active' : ''}`}>
            <FiMail title="Subscribers" /> VIP List
          </NavLink>
        </nav>

        <div className="admin-sidebar__footer">
          <a href="/" className="admin-nav__link">
            <FiHome /> Back to Store
          </a>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="admin-main">
        <header className="admin-header">
          <h2>Admin Portal</h2>
          <div className="admin-header__user">
            <span>Admin</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
