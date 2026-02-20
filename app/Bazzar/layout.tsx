import React from 'react';
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';
import NavBar from './NavBar';

export default function BazzarLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        {children}
        <NavBar />
      </FavoritesProvider>
    </CartProvider>
  );
}
