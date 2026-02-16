'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ShopCreationState {
  name: string;
  description: string;
  logo: File | null;
  logoPreview: string | null;
  workCategory: string;
  skill: string;
  experience: number;
}

interface ShopCreationContextType {
  state: ShopCreationState;
  updateState: (updates: Partial<ShopCreationState>) => void;
  resetState: () => void;
}

const initialState: ShopCreationState = {
  name: '',
  description: '',
  logo: null,
  logoPreview: null,
  workCategory: '',
  skill: '',
  experience: 0,
};

const ShopCreationContext = createContext<ShopCreationContextType | undefined>(undefined);

export function ShopCreationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ShopCreationState>(initialState);

  const updateState = (updates: Partial<ShopCreationState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return (
    <ShopCreationContext.Provider value={{ state, updateState, resetState }}>
      {children}
    </ShopCreationContext.Provider>
  );
}

export function useShopCreation() {
  const context = useContext(ShopCreationContext);
  if (context === undefined) {
    throw new Error('useShopCreation must be used within a ShopCreationProvider');
  }
  return context;
}
