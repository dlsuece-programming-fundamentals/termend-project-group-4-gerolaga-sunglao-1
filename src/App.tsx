

import { useState, useEffect } from 'react';
import { products as initialProducts } from './products';
import './App.css';


function App() {
  // Product type
  type Product = {
    name: string;
    stock: number;
    unit: string;
    price: number;
  };

  // Convert legacy products to new format if needed
  function normalizeProducts(arr: any[]): Product[] {
    return arr.map((p) => {
      if (typeof p.stock === 'string') {
        const [qty, unit] = p.stock.split(' ');
        return {
          ...p,
          stock: Number(qty),
          unit: p.unit || unit || '',
          price: Number(p.price),
        };
      }
      return { ...p, stock: Number(p.stock), price: Number(p.price) };
    });
  }

  // Load from localStorage or use initialProducts
  const [productList, setProductList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? normalizeProducts(JSON.parse(saved)) : normalizeProducts(initialProducts);
  });
  const [newProduct, setNewProduct] = useState<Product>({ name: '', stock: 0, price: 0, unit: '' });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<Product>({ name: '', stock: 0, price: 0, unit: '' });

  // Add new product
  const handleAddProduct: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.unit || isNaN(newProduct.stock) || isNaN(newProduct.price)) return;
    setProductList([
      ...productList,
      { ...newProduct, stock: Number(newProduct.stock), price: Number(newProduct.price) },
    ]);
    setNewProduct({ name: '', stock: 0, price: 0, unit: '' });
  };

  // Start editing a product
  const handleEditClick = (idx: number) => {
    setEditIndex(idx);
    setEditProduct({ ...productList[idx] });
  };

  // Save edited product
  const handleSaveEdit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (editIndex === null) return;
    const updated = [...productList];
    updated[editIndex] = { ...editProduct, stock: Number(editProduct.stock), price: Number(editProduct.price) };
    setProductList(updated);
    setEditIndex(null);
    setEditProduct({ name: '', stock: 0, price: 0, unit: '' });
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'new' | 'edit') => {
    const { name, value } = e.target;
    if (type === 'new') setNewProduct((p) => ({ ...p, [name]: name === 'stock' || name === 'price' ? Number(value) : value }));
    else setEditProduct((p) => ({ ...p, [name]: name === 'stock' || name === 'price' ? Number(value) : value }));
  };

  // Save to localStorage whenever productList changes
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(productList));
  }, [productList]);

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
          <input name="stock" type="number" min="0" value={newProduct.stock} onChange={e => handleInputChange(e, 'new')} placeholder="Stock" required />
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
                  <input name="stock" type="number" min="0" value={editProduct.stock} onChange={e => handleInputChange(e, 'edit')} required />
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
                      <span className="stock-value">{product.stock} <span className="stock-unit">{product.unit}</span></span>
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

export default App;
