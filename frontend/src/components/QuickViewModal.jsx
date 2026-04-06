import { useState } from 'react';
import { FiX, FiShoppingCart, FiHeart, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './QuickViewModal.css';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  if (!isOpen || !product) return null;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      setError('Please select a size.');
      return;
    }
    if (product.colors?.length > 0 && !selectedColor) {
      setError('Please select a color.');
      return;
    }
    addToCart(product, selectedSize || 'One Size', selectedColor || '', quantity);
    onClose();
  };

  return (
    <div className="qv-overlay" onClick={onClose}>
      <div className="qv-modal" onClick={e => e.stopPropagation()}>
        <button className="qv-close" onClick={onClose}><FiX /></button>
        
        <div className="qv-content">
          <div className="qv-image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="qv-info">
            <span className="qv-category">{product.category}</span>
            <h2 className="qv-name">{product.name}</h2>
            <div className="qv-price">₹{product.price.toLocaleString('en-IN')}</div>
            
            <p className="qv-description">{product.description}</p>

            <div className="qv-options">
              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
              <div className="qv-option-group">
                <label>Size</label>
                <div className="qv-grid">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      className={`qv-btn-square ${selectedSize === size ? 'qv-active' : ''}`}
                      onClick={() => { setSelectedSize(size); setError(''); }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              )}

              {/* Colors */}
              {product.colors && (
                <div className="qv-option-group">
                  <label>Color</label>
                  <div className="qv-grid">
                    {product.colors.map(color => (
                      <button 
                        key={color}
                        className={`qv-btn-pill ${selectedColor === color ? 'qv-active' : ''}`}
                        onClick={() => { setSelectedColor(color); setError(''); }}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {error && <p className="qv-error">{error}</p>}

            <div className="qv-actions">
              <div className="qv-qty">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><FiMinus /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}><FiPlus /></button>
              </div>
              
              <button className="btn-primary qv-add-btn" onClick={handleAddToCart}>
                <FiShoppingCart /> Add to Cart
              </button>
              
              <button 
                className={`qv-wish-btn ${isWishlisted ? 'qv-wish-btn--active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
              >
                <FiHeart fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
