// src/products.ts
export const products = [
  { name: 'Lucky Me Pancit Canton', stock: '45 pack', price: 15, unit: 'pack', category: 'Noodles' },
  { name: 'Coca-Cola 1.5L', stock: '20 bottle', price: 60, unit: 'bottle', category: 'Drinks' },
  { name: 'Skyflakes Crackers', stock: '30 pack', price: 35, unit: 'pack', category: 'Snacks' },
  { name: 'Century Tuna', stock: '25 can', price: 42, unit: 'can', category: 'Canned Goods' },
  { name: 'Alaska Condensed Milk', stock: '18 can', price: 48, unit: 'can', category: 'Dairy' },
  { name: 'Royal Soft Drink', stock: '35 bottle', price: 20, unit: 'bottle', category: 'Drinks' },
  { name: 'Payless Bread', stock: '40 piece', price: 12, unit: 'piece', category: 'Bakery' },
  { name: 'Birch Tree Powdered Milk', stock: '15 pack', price: 285, unit: 'pack', category: 'Dairy' },
  { name: 'Piattos Chips', stock: '22 pack', price: 25, unit: 'pack', category: 'Snacks' },
  { name: 'C2 Green Tea', stock: '50 bottle', price: 18, unit: 'bottle', category: 'Drinks' },
  { name: 'Colgate Toothpaste', stock: '12 tube', price: 65, unit: 'tube', category: 'Personal Care' },
  { name: 'Safeguard Soap', stock: '28 bar', price: 35, unit: 'bar', category: 'Personal Care' },
];

export function getProductByName(name: string) {
  return products.find((p) => p.name === name);
}

export function getTotalStock() {
  return products.reduce((sum, p) => {
    const qty = parseInt(p.stock.split(' ')[0], 10);
    return sum + (isNaN(qty) ? 0 : qty);
  }, 0);
}

