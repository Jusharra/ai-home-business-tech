'use client';

import { useState, useEffect, useCallback } from 'react';
import { CartItem } from '@/types';

const CART_KEY = 'fcc_cart';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  const saveItems = useCallback((newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(newItems));
    } catch {
      // ignore
    }
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'>) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === item.productId);
        const updated = existing
          ? prev.map((i) =>
              i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
            )
          : [...prev, { ...item, quantity: 1 }];
        try {
          localStorage.setItem(CART_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prev) => {
        const updated = prev.filter((i) => i.productId !== productId);
        try {
          localStorage.setItem(CART_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }
      setItems((prev) => {
        const updated = prev.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        );
        try {
          localStorage.setItem(CART_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    saveItems([]);
  }, [saveItems]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    isLoaded,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };
}
