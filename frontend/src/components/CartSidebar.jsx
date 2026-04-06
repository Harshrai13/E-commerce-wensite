import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import './CartSidebar.css';

const CartSidebar = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, cartCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'cart-overlay--visible' : ''}`} onClick={() => setIsCartOpen(false)} />
      <aside className={`cart-sidebar ${isCartOpen ? 'cart-sidebar--open' : ''}`} id="cart-sidebar">
        <div className="cart-sidebar__header">
          <h2 className="cart-sidebar__title">
            <FiShoppingBag />
            Your Cart
            {cartCount > 0 && <span className="cart-sidebar__count">{cartCount}</span>}
          </h2>
          <button className="cart-sidebar__close" onClick={() => setIsCartOpen(false)} aria-label="Close Cart">
            <FiX size={24} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-sidebar__empty">
            <div className="cart-sidebar__empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet.</p>
            <button className="btn-primary" onClick={() => { setIsCartOpen(false); navigate('/'); }}>
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-sidebar__items">
              {cartItems.map((item) => (
                <div className="cart-item" key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}>
                  <div className="cart-item__image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item__details">
                    <h4 className="cart-item__name">{item.name}</h4>
                    <div className="cart-item__specs">
                      <span className="cart-item__spec">Size: {item.selectedSize}</span>
                      {item.selectedColor && <span className="cart-item__spec">Color: {item.selectedColor}</span>}
                    </div>
                    <span className="cart-item__price">₹{item.price.toLocaleString('en-IN')}</span>
                    <div className="cart-item__actions">
                      <div className="cart-item__qty">
                        <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)} disabled={item.quantity <= 1}>
                          <FiMinus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}>
                          <FiPlus size={14} />
                        </button>
                      </div>
                      <button className="cart-item__remove" onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}>
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-sidebar__footer">
              <div className="cart-sidebar__subtotal">
                <span>Subtotal</span>
                <span className="cart-sidebar__subtotal-amount">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <p className="cart-sidebar__shipping-note">Shipping calculated at checkout</p>
              <button className="btn-primary cart-sidebar__checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
                <FiArrowRight />
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default CartSidebar;
