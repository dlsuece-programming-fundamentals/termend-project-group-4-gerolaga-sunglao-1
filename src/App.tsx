

import { useState } from 'react';
import { products as initialProducts } from './products';
import './App.css';


function App() {
  const [productList, setProductList] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({ name: '', stock: '', price: '', unit: '' });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState({ name: '', stock: '', price: '', unit: '' });

  // Add new product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.stock || !newProduct.price || !newProduct.unit) return;
    setProductList([
      ...productList,
      { ...newProduct, price: parseFloat(newProduct.price) },
    ]);
    setNewProduct({ name: '', stock: '', price: '', unit: '' });
  };

  // Start editing a product
  const handleEditClick = (idx: number) => {
    setEditIndex(idx);
    setEditProduct({ ...productList[idx], price: productList[idx].price.toString() });
  };

  // Save edited product
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex === null) return;
    const updated = [...productList];
    updated[editIndex] = { ...editProduct, price: parseFloat(editProduct.price) };
    setProductList(updated);
    setEditIndex(null);
    setEditProduct({ name: '', stock: '', price: '', unit: '' });
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'new' | 'edit') => {
    const { name, value } = e.target;
    if (type === 'new') setNewProduct((p) => ({ ...p, [name]: value }));
    else setEditProduct((p) => ({ ...p, [name]: value }));
  };

  return (
    <div>
      {/* Header */}
      <div className="sari-header">
        <span className="icon">🏪</span>
        <div>
          <div className="title">3D Store</div>
          <div className="subtitle">Local sari-sari store</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="heading">Available Products</div>
        <div className="desc">Browse our selection of everyday essentials</div>
        {/* Add Product Form */}
        <form className="product-form" onSubmit={handleAddProduct} style={{marginBottom: 24}}>
          <input name="name" value={newProduct.name} onChange={e => handleInputChange(e, 'new')} placeholder="Product Name" required />
          <input name="stock" value={newProduct.stock} onChange={e => handleInputChange(e, 'new')} placeholder="Stock (e.g. 10 pack)" required />
          <input name="unit" value={newProduct.unit} onChange={e => handleInputChange(e, 'new')} placeholder="Unit (e.g. pack)" required />
          <input name="price" type="number" min="0" step="0.01" value={newProduct.price} onChange={e => handleInputChange(e, 'new')} placeholder="Price" required />
          <button type="submit">Add Product</button>
        </form>

        <div className="product-grid">
          {productList.map((product, idx) => (
            <div key={product.name + idx} className="product-card">
              {editIndex === idx ? (
                <form className="card-details" onSubmit={handleSaveEdit}>
                  <input name="name" value={editProduct.name} onChange={e => handleInputChange(e, 'edit')} required />
                  <input name="stock" value={editProduct.stock} onChange={e => handleInputChange(e, 'edit')} required />
                  <input name="unit" value={editProduct.unit} onChange={e => handleInputChange(e, 'edit')} required />
                  <input name="price" type="number" min="0" step="0.01" value={editProduct.price} onChange={e => handleInputChange(e, 'edit')} required />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditIndex(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <div className="card-header">
                    <span className="box-icon">📦</span>
                    <span>{product.name}</span>
                  </div>
                  <div className="card-details">
                    <div className="stock">
                      Stock:
                      <span className="stock-value">{product.stock.split(' ')[0]} <span className="stock-unit">{product.stock.split(' ')[1]}</span></span>
                    </div>
                    <div className="price">
                      Price:
                      <span className="price-value">₱{product.price.toFixed(2)}</span>
                    </div>
                    <button type="button" onClick={() => handleEditClick(idx)}>Edit</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App
