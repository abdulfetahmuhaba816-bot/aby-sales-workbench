import { useState, useEffect } from 'react';
import { Product, PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('invoice_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('invoice_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (code: string, updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.code === code ? updatedProduct : p));
  };

  const deleteProduct = (code: string) => {
    setProducts(prev => prev.filter(p => p.code !== code));
  };

  const findProductByCode = (code: string) => {
    return products.find(p => p.code === code);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    findProductByCode,
    setProducts
  };
}
