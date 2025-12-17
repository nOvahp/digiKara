"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface CartItem {
    id: number;
    name: string;
    shopName: string;
    price: number;
    count: number;
    image: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "count">) => void;
    removeItem: (id: number) => void;
    incrementItem: (id: number) => void;
    decrementItem: (id: number) => void;
    totalPrice: number;
    finalPrice: number;
    shippingCost: number;
    discount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    // Initialize with mock data ONLY for demonstration if empty, or start empty. 
    // User requested "price and whatever a cart needs" and "add to cart to page".
    // I will start empty to be "real".
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (newItem: Omit<CartItem, "count">) => {
        const alreadyInCart = items.some(item => item.id === newItem.id);

        setItems((prev) => {
            const existing = prev.find((item) => item.id === newItem.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === newItem.id ? { ...item, count: item.count + 1 } : item
                );
            }
            return [...prev, { ...newItem, count: 1 }];
        });

        if (alreadyInCart) {
             toast.success("تعداد محصول افزایش یافت");
        } else {
             toast.success("محصول به سبد خرید اضافه شد");
        }
    };

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
        toast.error("محصول از سبد خرید حذف شد");
    };

    const incrementItem = (id: number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, count: item.count + 1 } : item
            )
        );
    };

    const decrementItem = (id: number) => {
        setItems((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    return { ...item, count: Math.max(0, item.count - 1) };
                }
                return item;
            }).filter(item => item.count > 0);
        });
    };

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);
    const shippingCost = items.length > 0 ? 15000000 : 0; // Mock fixed shipping if cart has items
    const discount = items.length > 0 ? 5000000 : 0; // Mock fixed discount
    const finalPrice = Math.max(0, totalPrice + shippingCost - discount);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                incrementItem,
                decrementItem,
                totalPrice,
                finalPrice,
                shippingCost,
                discount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
