import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiX, FiUser } from 'react-icons/fi';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register, user, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      onClose(); // Close modal on success
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setName('');
    setPassword('');
  };

  if (user) {
    return (
      <div className="auth-modal-overlay" onClick={onClose}>
        <div className="auth-modal" onClick={e => e.stopPropagation()}>
          <button className="auth-modal__close" onClick={onClose}>
            <FiX size={24} />
          </button>
          
          <div className="auth-modal__header">
            <div className="auth-modal__user-icon">
              <FiUser size={32} />
            </div>
            <h2>Welcome back!</h2>
            <p className="auth-modal__email">{user.email}</p>
            <span className="auth-modal__role-badge">{user.role}</span>
          </div>

          <div className="auth-modal__actions">
            {user.role === 'admin' && (
              <a href="/admin" className="btn-primary auth-modal__admin-btn">
                Admin Dashboard
              </a>
            )}
            <button 
              className="btn-secondary auth-modal__logout-btn"
              onClick={() => { logout(); onClose(); }}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose}>
          <FiX size={24} />
        </button>

        <h2 className="auth-modal__title">{isLogin ? 'Sign In' : 'Create Account'}</h2>
        <p className="auth-modal__subtitle">
          {isLogin ? 'Welcome back to Luxe Store' : 'Join the most premium shopping experience'}
        </p>

        {error && <div className="auth-modal__error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-modal__form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="John Doe"
                required 
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="you@example.com"
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
              minLength={6}
            />
          </div>

          <button type="submit" className="btn-primary auth-modal__submit" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-modal__switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={resetForm}>
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
