import React from 'react';
import NavBar from './NavBar';
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';
import { OrderProvider } from './OrderContext';

export default function BazzarLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        <OrderProvider>
          {children}
          <div className="block lg:hidden">
            <NavBar />
          </div>
        </OrderProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}
