import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import PolicyModal from '../components/PolicyModal';
import { FiArrowRight, FiGrid, FiSearch, FiEye, FiCheckCircle, FiHeart, FiShoppingBag, FiClock } from 'react-icons/fi';
import './Home.css';

const API_URL = (import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '');

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [activePolicy, setActivePolicy] = useState(null);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/products`, {
          params: { category: activeCategory }
        });
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id - a.id;
      return 0;
    });

  const categories = [
    { key: 'all', label: 'All Products' },
    { key: 'new', label: 'New Arrivals' },
    { key: 'clothes', label: 'Clothing' },
    { key: 'shoes', label: 'Shoes' },
    { key: 'accessories', label: 'Accessories' }
  ];

  const getSectionTitle = () => {
    switch(activeCategory) {
      case 'new': return 'New Arrivals';
      case 'clothes': return 'Clothing';
      case 'shoes': return 'Shoes';
      case 'accessories': return 'Accessories';
      default: return 'Our Collection';
    }
  };

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  return (
    <div className="home page-enter">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__gradient" />
          <motion.div 
            className="hero__pattern"
            animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          />
          {/* Glowing Orbs */}
          <motion.div 
            className="hero__orb hero__orb-1" 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
          <motion.div 
            className="hero__orb hero__orb-2" 
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
          />
        </div>
        
        <div className="hero__content container">
          <div className="hero__content-inner">
            <div className="hero__content-left">
              <motion.div 
                className="hero__limited-offer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span>✨ Limited Offer</span>
                <div className="hero__limited-divider" />
                <span>Up to 30% OFF • This Week Only</span>
                <FiArrowRight />
              </motion.div>

              <motion.span 
                className="hero__badge-premium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                ✨ PREMIUM COLLECTION 2028
              </motion.span>
              
              <motion.h1 
                className="hero__title"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
                  }
                }}
              >
                {"Elevate Your ".split(" ").map((word, i) => (
                  <motion.span key={i} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                    {word}
                  </motion.span>
                ))}
                <motion.span 
                  className="emerald-title-stroke"
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                  style={{ display: 'inline-block' }}
                >
                  Style
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="hero__subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Discover premium clothing and footwear for those who demand excellence. 
                Where everyday comfort meets high-fashion luxury.
              </motion.p>
              
              <motion.div 
                className="hero__actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <a href="#products" className="btn-primary" id="shop-now-btn">
                  Shop Now <FiArrowRight />
                </a>
                <a href="#products" className="btn-outline">
                  <span className="btn-outline__play">▶</span>
                  Explore Collection
                </a>
              </motion.div>

              <motion.div 
                className="hero__features-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="hero__feature-item">
                  <span className="hero__feature-icon">🚚</span>
                  <div className="hero__feature-text">
                    <strong>Free Shipping</strong>
                    <span>On orders above ₹2,999</span>
                  </div>
                </div>
                <div className="hero__feature-divider" />
                <div className="hero__feature-item">
                  <span className="hero__feature-icon">🔄</span>
                  <div className="hero__feature-text">
                    <strong>Easy Returns</strong>
                    <span>30-day return policy</span>
                  </div>
                </div>
                <div className="hero__feature-divider" />
                <div className="hero__feature-item">
                  <span className="hero__feature-icon">💳</span>
                  <div className="hero__feature-text">
                    <strong>Secure Payment</strong>
                    <span>100% protected</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="hero__stats"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {[
                   { num: "500+", label: "EXCLUSIVE DROPS" },
                   { num: "50k+", label: "GLOBAL CLIENTS" },
                   { num: "4.9★", label: "BRAND RATING" }
                ].map((stat, i) => (
                  <div key={i} className="hero__stat-group">
                    <div className="hero__stat">
                      <span className="hero__stat-num">{stat.num}</span>
                      <span className="hero__stat-label">{stat.label}</span>
                    </div>
                  </div>
                ))}
                <div className="hero__social-proof">
                   <div className="hero__avatar-group">
                     {[1,2,3,4,5].map(i => (
                       <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} alt="User" className="hero__avatar" />
                     ))}
                   </div>
                   <span className="hero__social-text">Join 50k+ happy customers</span>
                </div>
              </motion.div>
            </div>
            <div className="hero__showcase">
              <motion.div
                className="hero__card hero__card-1"
                initial={{ opacity: 0, x: 50, rotate: 10 }}
                animate={{ opacity: 1, x: 0, rotate: -4 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="hero__card-tag">BESTSELLER</div>
                <div className="hero__card-image">
                  <div className="hero__card-favorite"><FiHeart /></div>
                  <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop" alt="Urban Street Sneakers" />
                </div>
                <div className="hero__card-info">
                  <h4>Urban Street Sneakers</h4>
                  <div className="hero__card-rating">⭐⭐⭐⭐⭐ <span>(4.9)</span></div>
                  <div className="hero__card-footer">
                    <div className="hero__card-price">₹3,499</div>
                    <button className="hero__card-cart-btn">
                      <FiShoppingBag /> Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="hero__card hero__card-2"
                initial={{ opacity: 0, x: 100, rotate: -10 }}
                animate={{ opacity: 1, x: 0, rotate: 4 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="hero__card-image">
                  <div className="hero__card-favorite"><FiClock /></div>
                  <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop" alt="Classic Black Hoodie" />
                </div>
                <div className="hero__card-info">
                  <h4>Classic Black Hoodie</h4>
                  <div className="hero__card-footer">
                     <div className="hero__card-price">₹1,999</div>
                     <div className="hero__card-arrow"><FiArrowRight /></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </section>

      {/* Products Section Wrapper */}
      <div className="products-container" id="products">
        <div className="products__bg">
          <div className="products__orb products__orb-1" />
          <div className="products__orb products__orb-2" />
          <div className="products__orb products__orb-3" />
        </div>

        <section className="products-section container">
          <motion.div 
            className="products-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div>
            <h2 className="products-section__title">
              <FiShoppingBag className="products-section__icon" />
              {getSectionTitle()}
            </h2>
            <p className="products-section__subtitle">
              {activeCategory === 'new' ? 'The latest drops from our boutique' : 'Handpicked styles for every occasion'}
            </p>
          </div>
          <div className="products-section__search">
            <FiSearch className="products-section__search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="products-section__search-input"
              id="product-search-input"
            />
          </div>
          <div className="products-section__filter">
            <label className="products-section__filter-label">Filter</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="products-section__filter-select"
            >
              <option value="newest">New Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </motion.div>

        <motion.div 
          className="products-section__filters"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`filter-btn ${activeCategory === cat.key ? 'filter-btn--active' : ''}`}
              onClick={() => setSearchParams(cat.key === 'all' ? {} : { category: cat.key })}
              id={`filter-${cat.key}`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="products-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="product-skeleton">
                <div className="skeleton product-skeleton__image" />
                <div className="product-skeleton__info">
                  <div className="skeleton product-skeleton__category" />
                  <div className="skeleton product-skeleton__name" />
                  <div className="skeleton product-skeleton__price" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="products-empty">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <motion.div 
            className="products-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {filteredProducts.map(product => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
        </section>
      </div>

      {/* Features Banner */}
      <motion.section 
        className="features container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {[
          { id: 'shipping', icon: "🚚", title: "Free Shipping", text: "On orders above ₹2,000" },
          { id: 'returns', icon: "🔄", title: "7-Day Return", text: "Hassle-free guarantee" },
          { id: 'secure', icon: "🛡️", title: "Secure Checkout", text: "256-bit SSL Protection" },
          { id: 'quality', icon: "✨", title: "Premium Care", text: "24/7 Dedicated Support" }
        ].map((feat, i) => (
          <motion.div 
            key={i} 
            className="feature-card" 
            variants={fadeInUp} 
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={() => { setActivePolicy(feat.id); setIsPolicyOpen(true); }}
            style={{ cursor: 'pointer' }}
          >
            <span className="feature-card__icon">{feat.icon}</span>
            <h3>{feat.title}</h3>
            <p>{feat.text}</p>
            <span className="feature-card__link">Read Policy →</span>
          </motion.div>
        ))}
      </motion.section>

      {/* Newsletter */}
      <Newsletter />

      {/* Policy Modal */}
      <PolicyModal 
        type={activePolicy} 
        isOpen={isPolicyOpen} 
        onClose={() => setIsPolicyOpen(false)} 
      />
    </div>
  );
};

export default Home;
