import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getItem, setItem } from '@/src/services/storage';
import type { CartItem, Product, ProductVariant } from '@/src/types';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'openwow_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => { loadCart(); }, []);
  useEffect(() => { saveCart(); }, [items]);

  async function loadCart() {
    try { const s = await getItem(STORAGE_KEY); if (s) setItems(JSON.parse(s)); } catch { /* ignore */ }
  }
  async function saveCart() {
    try { await setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }

  function addItem(product: Product, variant: ProductVariant, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id && i.variantId === variant.id);
      if (existing) {
        return prev.map((i) => i.productId === product.id && i.variantId === variant.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { productId: product.id, variantId: variant.id, quantity, color: variant.color, size: variant.size, unitPrice: variant.price }];
    });
  }

  function updateQuantity(productId: string, variantId: string, quantity: number) {
    if (quantity <= 0) { removeItem(productId, variantId); return; }
    setItems((prev) => prev.map((i) => i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i));
  }

  function removeItem(productId: string, variantId: string) {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
  }

  function clearCart() { setItems([]); }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);

  return <CartContext.Provider value={{ items, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
