import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiX, FiEdit2, FiTrash2, FiUploadCloud } from 'react-icons/fi';

const API_URL = (import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '');

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingId, setEditingId] = useState(null);

  // New Product Form State
  const [formData, setFormData] = useState({
    name: '', price: '', category: 'clothes', description: '', image: '',
    sizes: '', colors: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [sizeChartHeaders, setSizeChartHeaders] = useState('Size, Chest (in), Length (in)');
  const [sizeChartRows, setSizeChartRows] = useState('M, 40, 28\nL, 42, 29');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data.reverse());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', category: 'clothes', description: '', image: '', sizes: '', colors: '' });
    setSizeChartHeaders('Size, Chest (in), Length (in)');
    setSizeChartRows('M, 40, 28\nL, 42, 29');
    setImageFile(null);
    setEditingId(null);
    setModalMode('add');
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setModalMode('edit');
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      sizes: product.sizes ? product.sizes.join(', ') : '',
      colors: product.colors ? product.colors.join(', ') : ''
    });
    
    if (product.sizeChart) {
      setSizeChartHeaders(product.sizeChart.headers.join(', '));
      setSizeChartRows(product.sizeChart.rows.map(row => row.join(', ')).join('\n'));
    }
    
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you certain you want to delete this product?')) return;
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalImageUrl = formData.image;

      // 1. If an image file is selected, upload it first
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);
        const uploadRes = await axios.post(`${API_URL}/products/upload`, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        finalImageUrl = uploadRes.data.url;
      }

      // 2. Parse arrays
      const parsedSizes = formData.sizes.split(',').map(s => s.trim()).filter(s => s);
      const parsedColors = formData.colors.split(',').map(c => c.trim()).filter(c => c);
      const parsedHeaders = sizeChartHeaders.split(',').map(h => h.trim());
      const parsedRows = sizeChartRows.split('\n').map(row => row.split(',').map(cell => cell.trim()));

      const productPayload = {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        description: formData.description,
        image: finalImageUrl,
        sizes: parsedSizes,
        colors: parsedColors,
        badge: modalMode === 'add' ? 'New Arrival' : undefined,
        sizeChart: {
          headers: parsedHeaders,
          rows: parsedRows
        }
      };

      // 3. Save to database
      if (modalMode === 'add') {
        await axios.post(`${API_URL}/products`, productPayload);
      } else {
        await axios.put(`${API_URL}/products/${editingId}`, productPayload);
      }

      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (err) {
      alert('Error saving product: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Manage Products</h2>
        <button className="btn-primary" onClick={handleOpenAdd} style={{ padding: '10px 20px' }}>
          <FiPlus /> Add Product
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Sizes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>Loading products...</td></tr>
            ) : (
              products.map(product => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                  </td>
                  <td style={{ fontWeight: 500 }}>{product.name}</td>
                  <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                  <td style={{ color: 'var(--gold)', fontWeight: 600 }}>₹{product.price.toLocaleString('en-IN')}</td>
                  <td>{product.sizes ? product.sizes.join(', ') : ''}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => handleOpenEdit(product)} style={{ background: 'none', color: 'var(--gold)', cursor: 'pointer' }} aria-label="Edit">
                        <FiEdit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} style={{ background: 'none', color: 'var(--error)', cursor: 'pointer' }} aria-label="Delete">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{modalMode === 'add' ? 'Add New Product' : 'Edit Product'}</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}><FiX /></button>
            </div>
            
            <form onSubmit={handleSaveProduct}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group full">
                    <label>Image Upload <FiUploadCloud style={{ marginLeft: '6px' }} /></label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => setImageFile(e.target.files[0])} 
                      style={{ padding: '8px' }}
                    />
                    <small style={{ color: 'var(--text-muted)' }}>Or enter an image URL below if you don't have a file.</small>
                    <input 
                      type="url" 
                      value={formData.image} 
                      onChange={e => { setFormData({...formData, image: e.target.value}); setImageFile(null); }} 
                      placeholder="https://..." 
                      disabled={!!imageFile}
                      style={{ marginTop: '8px' }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Product Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Luxury Jacket" />
                  </div>
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g. 2999" />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select className="status-select" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ padding: '12px' }}>
                      <option value="clothes">Clothes</option>
                      <option value="shoes">Shoes</option>
                    </select>
                  </div>
                  
                  <div className="form-group full">
                    <label>Description</label>
                    <input required type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Product description..." />
                  </div>
                  
                  <div className="form-group">
                    <label>Available Sizes (comma separated)</label>
                    <input required type="text" value={formData.sizes} onChange={e => setFormData({...formData, sizes: e.target.value})} placeholder="e.g. S, M, L, XL" />
                  </div>
                  <div className="form-group">
                    <label>Available Colors (comma separated)</label>
                    <input type="text" value={formData.colors} onChange={e => setFormData({...formData, colors: e.target.value})} placeholder="e.g. Black, White" />
                  </div>
                  <div className="form-group full">
                    <label>Size Chart Headers (comma separated)</label>
                    <input required type="text" value={sizeChartHeaders} onChange={e => setSizeChartHeaders(e.target.value)} placeholder="Size, Chest, Length" />
                  </div>
                  <div className="form-group full">
                    <label>Size Chart Rows (comma separated, one row per line)</label>
                    <textarea 
                      required 
                      value={sizeChartRows} 
                      onChange={e => setSizeChartRows(e.target.value)} 
                      placeholder="M, 40, 28\nL, 42, 29"
                      style={{ padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'white', borderRadius: '4px', minHeight: '80px', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px' }} disabled={uploading}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '10px 20px' }} disabled={uploading}>
                  {uploading ? 'Processing Image...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
