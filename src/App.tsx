import React, { useState, useEffect } from 'react';
import { Invoice, LineItem } from './types/invoice';
import { InvoiceTable } from './components/InvoiceTable';
import { PrintableInvoice } from './components/PrintableInvoice';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Printer, RefreshCw, Settings } from 'lucide-react';
import { useProducts } from './hooks/use-products';
import { ProductManager } from './components/ProductManager';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog';
import { Toaster } from './components/ui/sonner';

const INITIAL_INVOICE: Invoice = {
  invoiceNo: '00000001',
  fsNo: '',
  date: new Date().toISOString().split('T')[0],
  customerName: '',
  customerTin: '',
  vatExempt: true,
  items: [
    { id: '1', code: '', description: '', quantity: 1, unitPrice: 0, total: 0 }
  ],
  subtotal: 0,
  vat: 0,
  total: 0
};

function App() {
  const { products, setProducts } = useProducts();
  const [invoice, setInvoice] = useState<Invoice>(() => {
    const saved = localStorage.getItem('current_invoice');
    return saved ? JSON.parse(saved) : INITIAL_INVOICE;
  });

  useEffect(() => {
    localStorage.setItem('current_invoice', JSON.stringify(invoice));
  }, [invoice]);

  const updateItems = (items: LineItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const vat = invoice.vatExempt ? 0 : subtotal * 0.15;
    const total = subtotal + vat;
    setInvoice({ ...invoice, items, subtotal, vat, total });
  };

  const handlePrint = () => {
    window.print();
  };

  const resetInvoice = () => {
    setInvoice({
      ...INITIAL_INVOICE,
      date: new Date().toISOString().split('T')[0],
      invoiceNo: (parseInt(invoice.invoiceNo) + 1).toString().padStart(8, '0')
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-4">
      <Toaster position="top-center" />
      {/* Editor UI - Hidden when printing */}
      <div className="no-print max-w-5xl mx-auto p-4 lg:p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Invoice Generator</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetInvoice}>
              <RefreshCw className="h-4 w-4 mr-2" /> Next Invoice
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" /> Manage Products
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Product Inventory Management</DialogTitle>
                </DialogHeader>
                <ProductManager products={products} onUpdate={setProducts} />
              </DialogContent>
            </Dialog>
            <Button onClick={handlePrint} className="bg-primary text-primary-foreground">
              <Printer className="h-4 w-4 mr-2" /> Print Preview
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNo">Invoice No</Label>
                  <Input
                    id="invoiceNo"
                    value={invoice.invoiceNo}
                    onChange={(e) => setInvoice({ ...invoice, invoiceNo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fsNo">Fs No</Label>
                  <Input
                    id="fsNo"
                    value={invoice.fsNo}
                    onChange={(e) => setInvoice({ ...invoice, fsNo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={invoice.date}
                    onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={invoice.customerName}
                    placeholder="Enter customer name"
                    onChange={(e) => setInvoice({ ...invoice, customerName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerTin">Customer TIN</Label>
                  <Input
                    id="customerTin"
                    value={invoice.customerTin}
                    placeholder="Enter customer TIN"
                    onChange={(e) => setInvoice({ ...invoice, customerTin: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent>
                <InvoiceTable items={invoice.items} onItemsChange={updateItems} products={products} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 border-b pb-3">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="vatStatus"
                      checked={invoice.vatExempt}
                      onChange={() => {
                        const subtotal = invoice.items.reduce((sum, item) => sum + item.total, 0);
                        setInvoice({ ...invoice, vatExempt: true, vat: 0, total: subtotal });
                      }}
                    />
                    <span>This is exempt from VAT (15%)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="vatStatus"
                      checked={!invoice.vatExempt}
                      onChange={() => {
                        const subtotal = invoice.items.reduce((sum, item) => sum + item.total, 0);
                        const vat = subtotal * 0.15;
                        setInvoice({ ...invoice, vatExempt: false, vat, total: subtotal + vat });
                      }}
                    />
                    <span>This is subject to VAT (15%)</span>
                  </label>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>{invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">VAT (15%):</span>
                  <span>{invoice.vat.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{invoice.total.toFixed(2)}</span>
                </div>
                <Button onClick={handlePrint} className="w-full mt-4">
                  <Printer className="h-4 w-4 mr-2" /> Print Now
                </Button>
              </CardContent>
            </Card>

            <Card className="no-print">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Product Codes Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {products.map(p => (
                    <div key={p.code} className="flex justify-between items-center border-b border-muted py-1.5 last:border-0">
                      <span className="font-mono bg-muted px-1.5 py-0.5 rounded font-bold text-primary">{p.code || 'N/A'}</span>
                      <span className="text-muted-foreground">{p.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="pt-4">
          <h2 className="text-lg font-semibold mb-4">Print Preview</h2>
          <div className="bg-white shadow-2xl overflow-hidden border">
             <PrintableInvoice invoice={invoice} />
          </div>
        </div>
      </div>

      {/* Actual Print Version - Hidden in Web View */}
      <div className="hidden print:block">
        <PrintableInvoice invoice={invoice} />
      </div>
    </div>
  );
}

export default App;
