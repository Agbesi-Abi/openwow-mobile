export type UUID = string;
export type ProductCategory = 'shoulder' | 'crossbody' | 'mini' | 'tote' | 'statement' | 'everyday';

export interface Category {
  id: UUID;
  slug: ProductCategory;
  name: string;
  description: string;
  heroImage: string;
  productCount?: number;
}

export interface Collection {
  id: UUID;
  slug: string;
  name: string;
  description: string;
  heroImage: string;
  productIds: UUID[];
}

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface ProductVariant {
  id: UUID;
  color: string;
  size?: string;
  sku: string;
  stock: number;
  price: number;
  image: string;
}

export interface ProductReview {
  id: UUID;
  productId: UUID;
  userName: string;
  rating: number;
  text: string;
  createdAt: string;
  images?: string[];
}

export interface Product {
  id: UUID;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  salePrice?: number;
  category: ProductCategory;
  images: string[];
  colors: ProductColor[];
  variants: ProductVariant[];
  stock: number;
  dimensions: string;
  material: string;
  care: string;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  isSoldOut: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface CartItem {
  productId: UUID;
  variantId: UUID;
  quantity: number;
  color: string;
  size?: string;
  unitPrice: number;
}

export interface WishlistItem {
  productId: UUID;
  addedAt: string;
}

export interface Address {
  id: UUID;
  label: string;
  name: string;
  phone: string;
  region: string;
  city: string;
  area: string;
  address: string;
  landmark?: string;
  notes?: string;
  isDefault: boolean;
}

export type OrderStatus = 'placed' | 'paid' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: UUID;
  productName: string;
  productImage: string;
  variantId: UUID;
  color: string;
  size?: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: UUID;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'cancelled';
  paymentMethod: string;
  address: Address;
  createdAt: string;
  estimatedDelivery: string;
  trackingHistory: TrackingEvent[];
}

export interface TrackingEvent {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export type PaymentMethod = 'momo' | 'card';

export interface PaymentResult {
  success: boolean;
  reference: string;
  message?: string;
}

export interface AppNotification {
  id: UUID;
  type: 'order' | 'payment' | 'delivery' | 'wishlist' | 'collection' | 'promo';
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  deepLink?: string;
}

export interface User {
  id: UUID;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  estimatedDays: string;
  fee: number;
}

export interface GhanaRegion {
  name: string;
  cities: string[];
}
