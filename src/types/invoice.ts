export interface LineItem {
  id: string;
  code: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  invoiceNo: string;
  fsNo: string;
  date: string;
  customerName: string;
  customerTin: string;
  vatExempt: boolean;
  items: LineItem[];
  subtotal: number;
  vat: number;
  total: number;
}
