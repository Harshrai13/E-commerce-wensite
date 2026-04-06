import { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch((import.meta.env.VITE_API_URL || 'https://e-commerce-wensite.onrender.com/api') + '/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubscribed(true);
        setEmail('');
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Connection failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter container">
      <div className="newsletter__inner">
        <div className="newsletter__content">
          <div className="newsletter__icon-box">
            <FiMail />
          </div>
          <h2>Join the <span className="gold-text">VIP list</span></h2>
          <p>Subscribe to receive early access to new collections and exclusive boutique events.</p>
        </div>

        {subscribed ? (
          <div className="newsletter__success">
            <FiSend className="newsletter__send-icon" />
            <h3>You're on the list!</h3>
            <p>Welcome to the inner circle. Keep an eye on your inbox.</p>
          </div>
        ) : (
          <form className="newsletter__form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
