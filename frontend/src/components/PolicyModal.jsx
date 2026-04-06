import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTruck, FiRefreshCw, FiShield, FiAward, FiCheckCircle } from 'react-icons/fi';
import './PolicyModal.css';

const POLICY_DATA = {
  shipping: {
    icon: <FiTruck />,
    title: 'Free Express Shipping',
    subtitle: 'Fast & Secure Delivery Worldwide',
    description: 'We offer free express shipping on all orders over ₹2,000. For orders below this amount, a flat shipping fee of ₹99 applies.',
    points: [
      'Dispatched within 24-48 hours',
      'Real-time tracking provided via SMS/Email',
      'Secure, tamper-proof luxury packaging',
      'Metropolitan delivery within 3-5 business days'
    ]
  },
  returns: {
    icon: <FiRefreshCw />,
    title: '7-Day Return Policy',
    subtitle: 'Hassle-Free Exchanges & Returns',
    description: 'Not satisfied with your acquisition? We offer a 7-day window for returns or exchanges from the date of delivery.',
    points: [
      'Full refund to original payment method',
      'Free reverse pickup across 25,000+ pincodes',
      'Items must be unworn with original tags',
      'Quality check performed upon arrival at warehouse'
    ]
  },
  secure: {
    icon: <FiShield />,
    title: 'Secure SSL Payment',
    subtitle: 'Your Privacy & Security is Our Priority',
    description: 'All transactions are encrypted using 256-bit SSL technology. We do not store your credit card or sensitive financial information.',
    points: [
      'PCI-DSS Compliant payment gateway',
      'Supports all major Cards, UPI, and Netbanking',
      'Encrypted end-to-end data transfer',
      'Fraud detection and prevention systems'
    ]
  },
  quality: {
    icon: <FiAward />,
    title: '24/7 Premium Support',
    subtitle: 'Dedicated Concierge for Our VIPs',
    description: 'Our luxury concierge team is available around the clock to assist you with styling, fitting, or order tracking.',
    points: [
      'Dedicated relationship managers for regular clients',
      'Styling consultation via Video Call',
      'Priority resolution for any shipping delays',
      'Lifetime warranty on boutique-exclusive items'
    ]
  }
};

const PolicyModal = ({ type, isOpen, onClose }) => {
  if (!type || !POLICY_DATA[type]) return null;
  const data = POLICY_DATA[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="policy-modal-overlay" onClick={onClose}>
          <motion.div 
            className="policy-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="policy-modal-close" onClick={onClose}>
              <FiX />
            </button>
            
            <div className="policy-modal-header">
              <div className="policy-modal-icon-box">
                {data.icon}
              </div>
              <h2>{data.title}</h2>
              <p className="subtitle">{data.subtitle}</p>
            </div>

            <div className="policy-modal-body">
              <p className="description">{data.description}</p>
              
              <div className="policy-points">
                {data.points.map((point, index) => (
                  <div key={index} className="policy-point">
                    <FiCheckCircle className="check-icon" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="policy-modal-footer">
              <button className="btn-primary" onClick={onClose}>Got it, thanks</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PolicyModal;
