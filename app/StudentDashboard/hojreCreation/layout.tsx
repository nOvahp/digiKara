"use client";

import { ShopCreationProvider } from "./context/ShopCreationContext";

export default function ShopCreationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShopCreationProvider>
      {children}
    </ShopCreationProvider>
  );
}
