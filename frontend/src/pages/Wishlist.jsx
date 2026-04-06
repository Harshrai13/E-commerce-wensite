import { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { FiHeart, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/products');
        const allProducts = res.data;
        const filtered = allProducts.filter(p => wishlistItems.includes(p.id));
        setProducts(filtered);
      } catch (err) {
        console.error('Error fetching wishlist products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [wishlistItems]);

  if (loading) {
    return (
      <div className="wishlist-page wishlist-page--loading">
        <div className="skeleton-grid">
          {[1, 2, 3, 4].map(i => <div key={i} className="skeleton product-card-skeleton" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page page-enter">
      <div className="container">
        <header className="wishlist-header">
          <div className="wishlist-header__title">
            <FiHeart className="wishlist-icon" />
            <h1>My Wishlist</h1>
          </div>
          <p className="wishlist-header__count">{products.length} Items Saved</p>
        </header>

        {products.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty__icon">
              <FiHeart />
            </div>
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite items to keep track of them.</p>
            <Link to="/" className="btn-primary">
              Browse Collection
              <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
