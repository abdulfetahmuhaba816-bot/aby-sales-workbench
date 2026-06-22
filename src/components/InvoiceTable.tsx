import React from 'react';
import { LineItem } from '../types/invoice';
import { Product } from '../data/products';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Trash2, Plus } from 'lucide-react';

interface InvoiceTableProps {
  items: LineItem[];
  onItemsChange: (items: LineItem[]) => void;
  products: Product[];
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({ items, onItemsChange, products }) => {
  const addItem = () => {
    const newItem: LineItem = {
      id: crypto.randomUUID(),
      code: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    onItemsChange([...items, newItem]);
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter((item) => item.id !== id));
  };
  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        let updatedItem = { ...item, [field]: value };

        // Lookup product if code is changed
        if (field === 'code') {
          const product = products.find(p => p.code === (value as string));
          if (product) {
            updatedItem = {
              ...updatedItem,
              description: product.name,
              unitPrice: product.price,
            };
          }
        }

        // Always recalculate total when description/code/price might have changed implicitly
        updatedItem.total = (updatedItem.quantity || 0) * (updatedItem.unitPrice || 0);
        return updatedItem;
      }
      return item;
    });
    onItemsChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-2 text-left w-20">Code</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-right w-24">Qty</th>
              <th className="p-2 text-right w-32">Unit Price</th>
              <th className="p-2 text-right w-32">Total</th>
              <th className="p-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-1">
                  <Input
                    value={item.code}
                    onChange={(e) => updateItem(item.id, 'code', e.target.value)}
                    className="h-8 border-none focus-visible:ring-1"
                  />
                </td>
                <td className="p-1">
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="h-8 border-none focus-visible:ring-1"
                  />
                </td>
                <td className="p-1">
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                    className="h-8 text-right border-none focus-visible:ring-1"
                  />
                </td>
                <td className="p-1">
                  <Input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                    className="h-8 text-right border-none focus-visible:ring-1"
                  />
                </td>
                <td className="p-1 text-right pr-4 font-medium">
                  {item.total.toFixed(2)}
                </td>
                <td className="p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button variant="outline" size="sm" onClick={addItem} className="w-full dashed">
        <Plus className="h-4 w-4 mr-2" /> Add Item
      </Button>
    </div>
  );
};
