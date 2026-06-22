import React from 'react';
import { Invoice } from '../types/invoice';
import { numberToWords } from '../lib/numberToWords';

interface PrintableInvoiceProps {
  invoice: Invoice;
}

export const PrintableInvoice: React.FC<PrintableInvoiceProps> = ({ invoice }) => {
  return (
    <div className="print-area bg-white text-black p-4 font-serif w-[210mm] mx-auto flex flex-col">
      {/* Header */}
      <div className="text-center space-y-1 mb-3 border-b-2 border-black pb-2">
        <h1 className="text-3xl font-bold tracking-tighter uppercase">Muhaba Keyrdin Super Market</h1>
        <div className="text-sm">
          <p>CITY: WOLITA SODO | KEBELE: GEBEYA</p>
          <p>Tel 1: 0916582354 | Tel 2: 0911724497</p>
          <p>TIN: 0103634681 | VAT REG: 34684950892 | FAX: + 000 000 00 00 00</p>
        </div>
      </div>

      <div className="flex justify-between mb-3">
        <div className="space-y-1">
          <p><span className="font-bold">Invoice No:</span> {invoice.invoiceNo}</p>
          <p><span className="font-bold">Fs No:</span> {invoice.fsNo}</p>
          <p><span className="font-bold">Date:</span> {invoice.date}</p>
        </div>
        <div className="text-right uppercase font-bold text-xl">
          CASH SALES ATTACHMENT
        </div>
      </div>

      {/* Customer Information */}
      <div className="border border-black p-2 mb-3">
        <h2 className="font-bold uppercase border-b border-black mb-1 pb-0.5">Customer Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><span className="font-bold">Name:</span> {invoice.customerName || '____________________'}</p>
          <p><span className="font-bold">TIN:</span> {invoice.customerTin || '____________________'}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="flex-grow">
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-1 text-left w-16">No.</th>
              <th className="border border-black p-1 text-left">Description</th>
              <th className="border border-black p-1 text-center w-20">Qty</th>
              <th className="border border-black p-1 text-right w-28">Unit Price</th>
              <th className="border border-black p-1 text-right w-32">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={item.id} className="h-10">
                <td className="border border-black p-1 text-left">{item.code || index + 1}</td>
                <td className="border border-black p-1 text-left">{item.description}</td>
                <td className="border border-black p-1 text-center">{item.quantity}</td>
                <td className="border border-black p-1 text-right">{item.unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="border border-black p-1 text-right">{item.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="border border-black p-1 text-right font-bold">Subtotal</td>
              <td className="border border-black p-1 text-right">{invoice.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr>
              <td colSpan={4} className="border border-black p-1 text-right font-bold">VAT (15%)</td>
              <td className="border border-black p-1 text-right">{invoice.vat.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr className="bg-gray-200">
              <td colSpan={4} className="border border-black p-1 text-right font-bold text-lg uppercase">Total Amount</td>
              <td className="border border-black p-1 text-right font-bold text-lg">{invoice.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr>
              <td colSpan={5} className="border border-black p-1">
                <span className="font-bold uppercase">Amount in words:</span> {numberToWords(invoice.total)}
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="border border-black p-1 text-center italic font-semibold">
                Invalid Without the Fiscal Receipt Attached
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* VAT Status */}
      <div className="mt-2 border border-black p-2">
        <div className="flex gap-8 text-sm">
          <span className="flex items-center gap-2">
            <span className="text-base">{invoice.vatExempt ? '☑' : '☐'}</span>
            <span>This is exempt from VAT (15%)</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-base">{!invoice.vatExempt ? '☑' : '☐'}</span>
            <span>This is subject to VAT (15%)</span>
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-2 border-t border-black">
        <div className="grid grid-cols-3 items-end">
          <div className="space-y-1">
            <p><span className="font-bold">Prepared by:</span> MUHABA KEYRDIN</p>
          </div>
          <div className="text-center font-bold">
            <p>ERCA: NFE0004112</p>
          </div>
          <div className="flex justify-end">
            <p className="border-t border-black pt-1 w-48 text-center font-bold">Approver's signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};
