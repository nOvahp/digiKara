
import React from "react";
import { CartProvider } from "./CartContext";

export default function BazzarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
