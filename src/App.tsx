

import { products } from './products';
import './App.css';


function App() {
  return (
    <div style={{ background: '#fff6e3', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#ff6600', color: 'white', padding: '32px 0 16px 0', display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 32 }}>
        <span style={{ fontSize: 40, marginRight: 12 }}>🏪</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 32, lineHeight: 1 }}>Sari-Sari Store</div>
          <div style={{ fontSize: 18, opacity: 0.9 }}>Your Neighborhood Store</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 0 }}>Available Products</div>
        <div style={{ color: '#555', marginBottom: 24 }}>Browse our selection of everyday essentials</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {products.map((product) => (
            <div key={product.name} style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, fontSize: 20 }}>
                <span style={{ background: '#fff6e3', borderRadius: '50%', padding: 8, color: '#ff6600', fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📦</span>
                <span>{product.name}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 8 }}>
                <div style={{ fontSize: 15, color: '#888', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Stock:
                  <span style={{ color: '#1ca12d', fontWeight: 600, marginLeft: 4 }}>{product.stock.split(' ')[0]} <span style={{ fontWeight: 400 }}>{product.stock.split(' ')[1]}</span></span>
                </div>
                <div style={{ fontSize: 15, color: '#888', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Price:
                  <span style={{ color: '#ff6600', fontWeight: 700, fontSize: 20, marginLeft: 4 }}>₱{product.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App
