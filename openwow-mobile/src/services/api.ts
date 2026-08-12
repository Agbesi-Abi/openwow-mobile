import { PRODUCTS, CATEGORIES, COLLECTIONS, DELIVERY_OPTIONS, GHANA_REGIONS } from '@/src/data/seed';
import type { Product, Category, Collection, DeliveryOption, GhanaRegion } from '@/src/types';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const api = {
  async getProducts(): Promise<Product[]> { await delay(300); return PRODUCTS; },
  async getProduct(id: string): Promise<Product | null> { await delay(200); return PRODUCTS.find((p) => p.id === id) ?? null; },
  async getProductsByCategory(category: string): Promise<Product[]> { await delay(300); return PRODUCTS.filter((p) => p.category === category); },
  async getFeaturedProducts(): Promise<Product[]> { await delay(200); return PRODUCTS.filter((p) => p.isFeatured); },
  async getNewArrivals(): Promise<Product[]> { await delay(200); return PRODUCTS.filter((p) => p.isNew); },
  async getTrendingProducts(): Promise<Product[]> { await delay(200); return [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 6); },
  async searchProducts(query: string): Promise<Product[]> {
    await delay(300);
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)) || p.category.toLowerCase().includes(q));
  },
  async getRelatedProducts(productId: string): Promise<Product[]> {
    await delay(200);
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return [];
    return PRODUCTS.filter((p) => p.category === product.category && p.id !== productId).slice(0, 4);
  },
  async getCategories(): Promise<Category[]> { await delay(200); return CATEGORIES; },
  async getCollections(): Promise<Collection[]> { await delay(200); return COLLECTIONS; },
  async getCollection(id: string): Promise<Collection | null> { await delay(200); return COLLECTIONS.find((c) => c.id === id || c.slug === id) ?? null; },
  async getDeliveryOptions(): Promise<DeliveryOption[]> { await delay(100); return DELIVERY_OPTIONS; },
  async getRegions(): Promise<GhanaRegion[]> { await delay(100); return GHANA_REGIONS; },
};
