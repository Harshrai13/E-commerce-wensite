import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import QuickViewModal from './QuickViewModal';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card" id={`product-card-${product.id}`}>
      <div className="product-card__image-wrapper">
        <img src={product.image} alt={product.name} className="product-card__image" loading="lazy" />
        
        <button 
          className={`product-card__wishlist-btn ${isWishlisted ? 'product-card__wishlist-btn--active' : ''}`}
          onClick={handleWishlist}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <FiHeart fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}
        <div className="product-card__overlay">
          <button className="product-card__quick-view" onClick={handleQuickView}>
            <FiEye size={20} />
            Quick View
          </button>
        </div>
      </div>
      
      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
      <div className="product-card__info">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__meta">
          <div className="product-card__rating">
            <FiStar className="product-card__star" />
            <span>{product.rating}</span>
            <span className="product-card__reviews">({product.reviews})</span>
          </div>
          <span className="product-card__price">₹{product.price.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
