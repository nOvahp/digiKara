import React from 'react';
import { CartProvider } from './CartContext';
import NavBar from './NavBar';

export default function BazzarLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <NavBar />
    </CartProvider>
  );
}
