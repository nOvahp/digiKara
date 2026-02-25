'use client';

import React, { createContext, useContext, useState } from 'react';

interface OrderContextValue {
  selectedAddressId: string | null;
  selectedDeliveryType: number;
  setSelectedAddressId: (id: string) => void;
  setSelectedDeliveryType: (type: number) => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState<number>(1);

  return (
    <OrderContext.Provider
      value={{ selectedAddressId, selectedDeliveryType, setSelectedAddressId, setSelectedDeliveryType }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used inside OrderProvider');
  return ctx;
}
