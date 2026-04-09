import { useState, useEffect, useRef } from 'react';
import { products as initialProducts } from './products';
import './App.css';

type Product = {
  name: string;
  stock: number;
  unit: string;
  price: number;
  category: string;
};

type NewProduct = {
  name: string;
  stock: string;
  unit: string;
  price: string;
  category: string;
};

const ADMIN_PASSWORD = 'admin123';

function normalizeProducts(arr: any[]): Product[] {
  return arr.map((p) => {
    if (typeof p.stock === 'string') {
      const [qty, unit] = p.stock.split(' ');
      return { ...p, stock: Number(qty), unit: p.unit || unit || '', price: Number(p.price), category: p.category || '' };
    }
    return { ...p, stock: Number(p.stock), price: Number(p.price), category: p.category || '' };
  });
}

function App() {
  const [productList, setProductList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? normalizeProducts(JSON.parse(saved)) : normalizeProducts(initialProducts);
  });
  const [newProduct, setNewProduct] = useState<NewProduct>({ name: '', stock: '', price: '', unit: '', category: '' });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<NewProduct>({ name: '', stock: '', price: '', unit: '', category: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);

  const categories = Array.from(new Set(productList.map(p => p.category))).sort();

  const filteredProducts = productList.filter((p) =>
    (selectedCategory === '' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.unit || !newProduct.category || newProduct.stock === '' || newProduct.price === '') return;
    setProductList([...productList, { ...newProduct, stock: Number(newProduct.stock), price: Number(newProduct.price) }]);
    setNewProduct({ name: '', stock: '', price: '', unit: '', category: '' });
  };

  const handleEditClick = (idx: number) => {
    setEditIndex(idx);
    setEditProduct({ ...productList[idx], stock: productList[idx].stock.toString(), price: productList[idx].price.toString() });
  };

  const handleSaveEdit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (editIndex === null) return;
    const updated = [...productList];
    updated[editIndex] = { ...editProduct, stock: Number(editProduct.stock), price: Number(editProduct.price) };
    setProductList(updated);
    setEditIndex(null);
    setEditProduct({ name: '', stock: '', price: '', unit: '', category: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'new' | 'edit') => {
    const { name, value } = e.target;
    const parsed = name === 'stock' || name === 'price' ? Number(value) : value;
    if (type === 'new') setNewProduct((p) => ({ ...p, [name]: parsed }));
    else setEditProduct((p) => ({ ...p, [name]: parsed }));
  };

  const handleDeleteProduct = (idx: number) => {
    const updated = productList.filter((_, i) => i !== idx);
    setProductList(updated);
    if (editIndex === idx) setEditIndex(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLoginModal(false);
      setLoginPassword('');
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Try again.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setEditIndex(null);
  };

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(productList));
  }, [productList]);

  useEffect(() => {
    if (showLoginModal) setTimeout(() => passwordRef.current?.focus(), 50);
  }, [showLoginModal]);

  // Find original index of a filtered product
  const getOriginalIndex = (filteredProduct: Product) =>
    productList.findIndex((p) => p === filteredProduct);

  return (
    <div className="app-wrapper">
      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🔐</div>
            <h2 className="modal-title">Admin Login</h2>
            <p className="modal-sub">Enter the admin password to manage products.</p>
            <form onSubmit={handleLogin} className="modal-form">
              <input
                ref={passwordRef}
                type="password"
                value={loginPassword}
                onChange={(e) => { setLoginPassword(e.target.value); setLoginError(''); }}
                placeholder="Password"
                className="modal-input"
                autoComplete="current-password"
              />
              {loginError && <div className="modal-error">{loginError}</div>}
              <div className="modal-actions">
                <button type="submit" className="btn-primary">Login</button>
                <button type="button" className="btn-secondary" onClick={() => { setShowLoginModal(false); setLoginError(''); setLoginPassword(''); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sari-header">
        <div className="header-left">
          <span className="store-icon">🏪</span>
          <div>
            <div className="title">3D Store</div>
            <div className="subtitle">Local sari-sari store</div>
          </div>
        </div>
        <div className="header-right">
          {isAdmin ? (
            <div className="admin-badge-group">
              <span className="admin-badge">👤 Admin</span>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className="btn-admin-login" onClick={() => setShowLoginModal(true)}>
              🔑 Admin Login
            </button>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="main-content">
        {/* Role Banner */}
        <div className={`role-banner ${isAdmin ? 'role-admin' : 'role-customer'}`}>
          {isAdmin ? '🛠 Admin Mode — You can add, edit, and delete products.' : '👁 Customer View — Browsing only. Login as admin to manage products.'}
        </div>

        <div className="section-title">Available Products</div>
        <div className="section-desc">Browse our selection of everyday essentials</div>

        {/* Category Filter */}
        <div className="category-filter-wrapper">
          <span className="filter-icon">🏷️</span>
          <select
            className="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {selectedCategory && (
            <button className="filter-clear" onClick={() => setSelectedCategory('')} title="Clear filter">
              ✕
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="search-bar-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="search-bar"
            type="text"
            placeholder="Search products…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')} title="Clear search">✕</button>
          )}
        </div>

        {/* Add Product Form (Admin only) */}
        {isAdmin && (
          <form className="product-form" onSubmit={handleAddProduct}>
            <label>
              Product Name
              <input name="name" value={newProduct.name} onChange={e => handleInputChange(e, 'new')} placeholder="e.g. Coca-Cola" required />
            </label>
            <label>
              Stock
              <input name="stock" type="number" min="0" value={newProduct.stock} onChange={e => handleInputChange(e, 'new')} placeholder="e.g. 20" required />
            </label>
            <label>
              Unit
              <input name="unit" value={newProduct.unit} onChange={e => handleInputChange(e, 'new')} placeholder="e.g. bottle" required />
            </label>
            <label>
              Price (₱)
              <input name="price" type="number" min="0" step="0.01" value={newProduct.price} onChange={e => handleInputChange(e, 'new')} placeholder="e.g. 60.00" required />
            </label>
            <label>
              Category
              <input name="category" value={newProduct.category} onChange={e => handleInputChange(e, 'new')} placeholder="e.g. Drinks" required />
            </label>
            <button type="submit" className="btn-add">＋ Add Product</button>
          </form>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <span>😕</span>
            <p>No products found{selectedCategory ? ` in "${selectedCategory}"` : ''}{searchQuery ? ` for "${searchQuery}"` : ''}</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => {
              const origIdx = getOriginalIndex(product);
              return (
                <div key={product.name + origIdx} className="product-card">
                  {isAdmin && editIndex === origIdx ? (
                    <form className="edit-form" onSubmit={handleSaveEdit}>
                      <label>Name
                        <input name="name" value={editProduct.name} onChange={e => handleInputChange(e, 'edit')} required />
                      </label>
                      <label>Stock
                        <input name="stock" type="number" min="0" value={editProduct.stock} onChange={e => handleInputChange(e, 'edit')} required />
                      </label>
                      <label>Unit
                        <input name="unit" value={editProduct.unit} onChange={e => handleInputChange(e, 'edit')} required />
                      </label>
                      <label>Price (₱)
                        <input name="price" type="number" min="0" step="0.01" value={editProduct.price} onChange={e => handleInputChange(e, 'edit')} required />
                      </label>
                      <label>Category
                        <input name="category" value={editProduct.category} onChange={e => handleInputChange(e, 'edit')} required />
                      </label>
                      <div className="edit-form-actions">
                        <button type="submit" className="btn-save">✓ Save</button>
                        <button type="button" className="btn-cancel" onClick={() => setEditIndex(null)}>✕ Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="card-header">
                        <span className="box-icon">📦</span>
                        <span className="card-name">{product.name}</span>
                      </div>
                      <div className="card-details">
                        <div className="stock-row">
                          <span className="detail-label">Stock</span>
                          <span className="stock-value">{product.stock} <span className="stock-unit">{product.unit}</span></span>
                        </div>
                        <div className="price-row">
                          <span className="detail-label">Price</span>
                          <span className="price-value">₱{product.price.toFixed(2)}</span>
                        </div>
                        {isAdmin && (
                          <div className="card-actions">
                            <button type="button" className="btn-edit" onClick={() => handleEditClick(origIdx)}>✏ Edit</button>
                            <button type="button" className="btn-delete" onClick={() => handleDeleteProduct(origIdx)}>🗑 Delete</button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {(searchQuery || selectedCategory) && filteredProducts.length > 0 && (
          <div className="search-results-count">
            Showing {filteredProducts.length} of {productList.length} products
          </div>
        )}
      </main>

      <footer className="sari-footer">
        <span>🏪 3D Store &mdash; Powered by React &amp; Vite</span>
      </footer>
    </div>
  );
}

export default App;
