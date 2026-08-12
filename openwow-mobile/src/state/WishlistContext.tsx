import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getItem, setItem } from '@/src/services/storage';
import type { WishlistItem } from '@/src/types';

interface WishlistContextValue {
  items: WishlistItem[];
  hasItem: (productId: string) => boolean;
  toggleItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = 'openwow_wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => { loadWishlist(); }, []);
  useEffect(() => { saveWishlist(); }, [items]);

  async function loadWishlist() {
    try { const s = await getItem(STORAGE_KEY); if (s) setItems(JSON.parse(s)); } catch { /* ignore */ }
  }
  async function saveWishlist() {
    try { await setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }

  function hasItem(productId: string) { return items.some((i) => i.productId === productId); }
  function toggleItem(productId: string) {
    setItems((prev) => prev.some((i) => i.productId === productId) ? prev.filter((i) => i.productId !== productId) : [...prev, { productId, addedAt: new Date().toISOString() }]);
  }
  function removeItem(productId: string) { setItems((prev) => prev.filter((i) => i.productId !== productId)); }

  return <WishlistContext.Provider value={{ items, hasItem, toggleItem, removeItem, count: items.length }}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
