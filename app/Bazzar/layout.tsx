import React from 'react';
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';
import { OrderProvider } from './OrderContext';
import NavBar from './NavBar';

export default function BazzarLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        <OrderProvider>
          {children}
          <NavBar />
        </OrderProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}
