import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getItem, setItem } from '@/src/services/storage';

interface RecentlyViewedContextValue {
  productIds: string[];
  addProduct: (productId: string) => void;
  clear: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(null);
const STORAGE_KEY = 'openwow_recently_viewed';
const MAX_ITEMS = 10;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>([]);

  useEffect(() => { loadItems(); }, []);

  async function loadItems() {
    try { const s = await getItem(STORAGE_KEY); if (s) setProductIds(JSON.parse(s)); } catch { /* ignore */ }
  }
  async function saveItems(ids: string[]) {
    try { await setItem(STORAGE_KEY, JSON.stringify(ids)); } catch { /* ignore */ }
  }

  function addProduct(productId: string) {
    setProductIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, MAX_ITEMS);
      saveItems(updated);
      return updated;
    });
  }

  function clear() { setProductIds([]); saveItems([]); }

  return <RecentlyViewedContext.Provider value={{ productIds, addProduct, clear }}>{children}</RecentlyViewedContext.Provider>;
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  return ctx;
}
