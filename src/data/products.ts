export interface Product {
  code: string;
  name: string;
  price: number;
}

export const PRODUCTS: Product[] = [
  { code: '001', name: 'Milk (1L)', price: 45.00 },
  { code: '002', name: 'Bread', price: 15.00 },
  { code: '003', name: 'Sugar (1kg)', price: 55.00 },
  { code: '004', name: 'Cooking Oil (1L)', price: 120.00 },
  { code: '005', name: 'Rice (1kg)', price: 65.00 },
  { code: '006', name: 'Eggs (Dozen)', price: 85.00 },
  { code: '007', name: 'Coffee (250g)', price: 110.00 },
  { code: '008', name: 'Tea Leaves (100g)', price: 35.00 },
  { code: '009', name: 'Salt (1kg)', price: 10.00 },
  { code: '010', name: 'Soap Bar', price: 25.00 },
  { code: '101', name: 'Coca Cola (500ml)', price: 30.00 },
  { code: '102', name: 'Pepsi (500ml)', price: 30.00 },
  { code: '103', name: 'Water (500ml)', price: 15.00 },
  { code: '201', name: 'Pasta (500g)', price: 40.00 },
  { code: '202', name: 'Macaroni (500g)', price: 40.00 },
  { code: '301', name: 'Biscuits', price: 20.00 },
  { code: '302', name: 'Chocolate Bar', price: 45.00 },
  { code: '401', name: 'Flour (2kg)', price: 180.00 },
  { code: '402', name: 'Butter (250g)', price: 95.00 },
  { code: '501', name: 'Tomato Paste', price: 35.00 },
  { code: '502', name: 'Spaghetti (500g)', price: 45.00 },
  { code: '601', name: 'Laundry Detergent', price: 250.00 },
  { code: '602', name: 'Dish Soap', price: 65.00 },
  { code: '701', name: 'Tissues (Pack)', price: 55.00 },
];

export const findProductByCode = (code: string): Product | undefined => {
  return PRODUCTS.find(p => p.code === code);
};
