import React, { useState } from 'react';
import { Product } from '../data/products';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Trash2, Plus, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface ProductManagerProps {
  products: Product[];
  onUpdate: (products: Product[]) => void;
}

export const ProductManager: React.FC<ProductManagerProps> = ({ products, onUpdate }) => {
  const [newProduct, setNewProduct] = useState<Product>({ code: '', name: '', price: 0 });

  const handleAddProduct = () => {
    if (!newProduct.code || !newProduct.name) {
      toast.error('Code and Name are required');
      return;
    }
    if (products.find(p => p.code === newProduct.code)) {
      toast.error('Product with this code already exists');
      return;
    }
    onUpdate([...products, newProduct]);
    setNewProduct({ code: '', name: '', price: 0 });
    toast.success('Product added successfully');
  };

  const handleDeleteProduct = (code: string) => {
    onUpdate(products.filter(p => p.code !== code));
    toast.success('Product deleted');
  };

  const handleEditProduct = (code: string, field: keyof Product, value: string | number) => {
    const updatedProducts = products.map(p => {
      if (p.code === code) {
        return { ...p, [field]: value };
      }
      return p;
    });
    onUpdate(updatedProducts);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to default product list? This will overwrite your current changes.')) {
      onUpdate(DEFAULT_PRODUCTS);
      toast.success('Products reset to default');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Manage your product list. These items will auto-fill the invoice when you type their code.</p>
        <Button variant="outline" size="sm" onClick={handleReset} className="text-muted-foreground">
          <RotateCcw className="h-4 w-4 mr-2" /> Reset to Default
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border p-4 rounded-lg bg-muted/20">
        <div className="space-y-2">
          <Label htmlFor="newCode">Code</Label>
          <Input
            id="newCode"
            value={newProduct.code}
            placeholder="e.g. 001"
            onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newName">Item Name</Label>
          <Input
            id="newName"
            value={newProduct.name}
            placeholder="e.g. Bread"
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPrice">Price</Label>
          <Input
            id="newPrice"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <Button onClick={handleAddProduct} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="max-h-[400px] overflow-y-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Code</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead className="text-right w-32">Price</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.code}>
                <TableCell className="font-mono">{product.code}</TableCell>
                <TableCell>
                  <Input
                    value={product.name}
                    className="h-8 border-transparent hover:border-input focus:border-input transition-colors"
                    onChange={(e) => handleEditProduct(product.code, 'name', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={product.price}
                    className="h-8 text-right border-transparent hover:border-input focus:border-input transition-colors"
                    onChange={(e) => handleEditProduct(product.code, 'price', parseFloat(e.target.value) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteProduct(product.code)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
