import { FiMail, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon">◆</span>
            <span className="footer__logo-text">LUXE</span>
            <span className="footer__logo-sub">STORE</span>
          </div>
          <p className="footer__tagline">
            Premium clothing & footwear for the modern individual. Elevate your style with our curated collections.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social-link" aria-label="Instagram"><FiInstagram size={18} /></a>
            <a href="#" className="footer__social-link" aria-label="Twitter"><FiTwitter size={18} /></a>
            <a href="#" className="footer__social-link" aria-label="Facebook"><FiFacebook size={18} /></a>
            <a href="#" className="footer__social-link" aria-label="Email"><FiMail size={18} /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Shop</h4>
          <Link to="/?category=clothes" className="footer__link">Clothing</Link>
          <Link to="/?category=shoes" className="footer__link">Shoes</Link>
          <Link to="/" className="footer__link">New Arrivals</Link>
          <Link to="/" className="footer__link">Bestsellers</Link>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Support</h4>
          <a href="#" className="footer__link">FAQ</a>
          <a href="#" className="footer__link">Shipping Policy</a>
          <a href="#" className="footer__link">Returns & Exchange</a>
          <a href="#" className="footer__link">Contact Us</a>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Newsletter</h4>
          <p className="footer__newsletter-text">Get exclusive offers and updates delivered to your inbox.</p>
          <div className="footer__newsletter-form">
            <input type="email" placeholder="Your email address" className="footer__newsletter-input" />
            <button className="footer__newsletter-btn">
              <FiMail size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>&copy; 2026 LUXE STORE. All rights reserved.</p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
