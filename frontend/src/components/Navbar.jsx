import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { FiShoppingBag, FiMenu, FiX, FiUser, FiHeart, FiClock } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import './Navbar.css';

const Navbar = () => {
  const { cartCount, toggleCart } = useCart();
  const { wishlistItems } = useWishlist();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenu(false);
  }, [location]);

  const handleCategoryClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    setTimeout(() => {
      const section = document.getElementById('products');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-icon">❖</span>
            <span className="navbar__logo-text">LUXE</span>
            <span className="navbar__logo-sub">COLLECTION 2028</span>
          </Link>

          <div className={`navbar__links ${mobileMenu ? 'navbar__links--open' : ''}`}>
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className={`navbar__link ${location.pathname === '/' && !location.search ? 'navbar__link--active' : ''}`}>
              Home
            </a>
            <a href="/?category=clothes" onClick={(e) => handleCategoryClick(e, '/?category=clothes')} className={`navbar__link ${location.search === '?category=clothes' ? 'navbar__link--active' : ''}`}>
              Clothing
            </a>
            <a href="/?category=shoes" onClick={(e) => handleCategoryClick(e, '/?category=shoes')} className={`navbar__link ${location.search === '?category=shoes' ? 'navbar__link--active' : ''}`}>
              Shoes
            </a>
            <a href="/?category=new" onClick={(e) => handleCategoryClick(e, '/?category=new')} className={`navbar__link ${location.search === '?category=new' ? 'navbar__link--active' : ''}`}>
              New Arrivals
            </a>
            <a href="/?category=accessories" onClick={(e) => handleCategoryClick(e, '/?category=accessories')} className={`navbar__link ${location.search === '?category=accessories' ? 'navbar__link--active' : ''}`}>
              Accessories
            </a>
            {user && (
              <Link to="/orders" className={`navbar__link ${location.pathname === '/orders' ? 'navbar__link--active' : ''}`}>
                My Orders
              </Link>
            )}
          </div>

          <div className="navbar__actions">
            <Link to="/wishlist" className="navbar__icon-btn" title="Wishlist">
              <FiHeart size={22} />
              <span className="navbar__badge">{wishlistItems.length > 0 ? wishlistItems.length : 3}</span>
            </Link>
            
            <button className="navbar__icon-btn" onClick={() => setAuthModalOpen(true)} aria-label="Account">
              <FiUser size={22} />
            </button>

            <button className="navbar__icon-btn" onClick={toggleCart} aria-label="Open Cart">
              <FiShoppingBag size={22} />
              <span className="navbar__badge">{cartCount > 0 ? cartCount : 2}</span>
            </button>

            <button className="navbar__icon-btn navbar__menu-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
