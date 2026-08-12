import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image, Share } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Heart, Share2, Star, Truck, RefreshCw, Shield, Minus, Plus } from 'lucide-react-native';
import { Text, DisplayText } from '@/src/components/OWText';
import { OWButton } from '@/src/components/OWButton';
import { OWBadge } from '@/src/components/OWBadge';
import { OWRating } from '@/src/components/OWRating';
import { OWProductCard } from '@/src/components/OWProductCard';
import { OWSkeleton } from '@/src/components/OWSkeleton';
import { OWErrorState } from '@/src/components/OWErrorState';
import { Colors, Spacing, Typography, Radius, formatPrice, Shadows } from '@/src/theme/tokens';
import { useResponsive } from '@/src/hooks/useResponsive';
import { api } from '@/src/services/api';
import { useCart } from '@/src/state/CartContext';
import { useWishlist } from '@/src/state/WishlistContext';
import { useRecentlyViewed } from '@/src/state/RecentlyViewedContext';
import { useToast } from '@/src/state/ToastContext';
import { hapticImpact, hapticNotify } from '@/src/utils/haptics';
import type { Product, ProductVariant } from '@/src/types';

export default function ProductDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width: screenWidth, contentPadding, horizontalCardWidth, isTablet } = useResponsive();
  const imageHeight = screenWidth * (isTablet ? 0.5 : 0.85);

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<'description' | 'details' | 'care' | null>('description');

  const { addItem } = useCart();
  const { hasItem, toggleItem } = useWishlist();
  const { addProduct } = useRecentlyViewed();
  const { showToast } = useToast();

  const load = useCallback(async () => {
    try {
      setError(false);
      const p = await api.getProduct(id);
      if (p) {
        setProduct(p);
        setSelectedVariant(p.variants[0] ?? null);
        addProduct(p.id);
        const rel = await api.getRelatedProducts(p.id);
        setRelated(rel);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id, addProduct]);

  useEffect(() => { load(); }, [load]);

  const handleAddToBag = () => {
    if (!product || !selectedVariant) return;
    if (selectedVariant.stock === 0) { showToast('This variant is sold out', 'error'); return; }
    addItem(product, selectedVariant, quantity);
    hapticNotify('success');
    showToast(`${product.name} added to bag`, 'success');
  };

  const handleShare = async () => {
    if (!product) return;
    try { await Share.share({ message: `Check out the ${product.name} on openwow!` }); } catch { /* ignore */ }
  };

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.navBar}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}><ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} /></Pressable>
        </View>
        <ScrollView>
          <OWSkeleton width="100%" height={imageHeight} radius={0} />
          <View style={{ padding: Spacing.md }}>
            <OWSkeleton width="60%" height={24} style={{ marginBottom: Spacing.sm }} />
            <OWSkeleton width="40%" height={20} style={{ marginBottom: Spacing.md }} />
            <OWSkeleton width="30%" height={20} />
          </View>
        </ScrollView>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.navBar}><Pressable onPress={() => router.back()} style={styles.backBtn}><ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} /></Pressable></View>
        <OWErrorState onRetry={load} />
      </View>
    );
  }

  const saved = hasItem(product.id);
  const isSoldOut = product.isSoldOut || (selectedVariant?.stock ?? 0) === 0;
  const displayPrice = product.salePrice ?? product.price;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}><ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} /></Pressable>
        <View style={{ flexDirection: 'row', gap: Spacing.xs }}>
          <Pressable onPress={handleShare} style={styles.iconBtn}><Share2 size={20} color={Colors.deepViolet} strokeWidth={2} /></Pressable>
          <Pressable onPress={() => { hapticImpact('light'); toggleItem(product.id); }} style={styles.iconBtn}>
            <Heart size={20} color={saved ? Colors.deepViolet : Colors.inkMuted} fill={saved ? Colors.deepViolet : 'transparent'} strokeWidth={2} />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Image Carousel */}
        <View style={[styles.imageContainer, { width: screenWidth, height: imageHeight }]}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={(e) => setActiveImageIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth))}>
            {product.images.map((img, i) => (
              <Image key={i} source={{ uri: img }} style={[styles.productImage, { width: screenWidth, height: imageHeight }]} resizeMode="cover" />
            ))}
          </ScrollView>
          <View style={styles.imageDots}>
            {product.images.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeImageIndex && styles.dotActive]} />
            ))}
          </View>
          {product.isNew && <View style={styles.newBadge}><OWBadge label="New" variant="new" /></View>}
        </View>

        {/* Info */}
        <View style={[styles.infoSection, { padding: contentPadding }]}>
          <Text style={{ ...Typography.label, color: Colors.electricViolet }}>{product.category.toUpperCase()}</Text>
          <DisplayText size={32} style={{ marginTop: 4 }}>{product.name}</DisplayText>
          <Text size={16} color="inkMuted" style={{ marginTop: 2 }}>{product.subtitle}</Text>

          <View style={styles.ratingRow}>
            <OWRating rating={product.rating} count={product.reviewCount} />
            {product.salePrice && <OWBadge label="Sale" variant="sale" />}
          </View>

          <View style={styles.priceRow}>
            <Text style={{ ...Typography.priceLarge, color: product.salePrice ? Colors.error : Colors.ink }}>{formatPrice(displayPrice)}</Text>
            {product.salePrice && <Text size={16} color="inkMuted" style={styles.originalPrice}>{formatPrice(product.price)}</Text>}
          </View>

          {/* Color Selection */}
          <View style={styles.section}>
            <Text size={14} weight="semiBold" color="ink">Color: <Text size={14} weight="regular" color="inkMuted">{selectedVariant?.color}</Text></Text>
            <View style={styles.colorOptions}>
              {product.colors.map((color) => {
                const isActive = selectedVariant?.color === color.name;
                return (
                  <Pressable key={color.name} onPress={() => { const v = product.variants.find((v) => v.color === color.name); if (v) { setSelectedVariant(v); hapticImpact('light'); } }} style={[styles.colorSwatch, isActive && styles.colorSwatchActive, { borderColor: color.hex }]}>
                    <View style={[styles.colorFill, { backgroundColor: color.hex }]} />
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.section}>
            <Text size={14} weight="semiBold" color="ink">Quantity</Text>
            <View style={styles.quantityRow}>
              <Pressable onPress={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1} style={({ pressed }) => [styles.qtyBtn, quantity <= 1 && { opacity: 0.3 }, pressed && { opacity: 0.6 }]}>
                <Minus size={18} color={Colors.deepViolet} strokeWidth={2.5} />
              </Pressable>
              <Text size={16} weight="bold" color="ink" style={{ minWidth: 40, textAlign: 'center' }}>{quantity}</Text>
              <Pressable onPress={() => setQuantity((q) => q + 1)} disabled={quantity >= (selectedVariant?.stock ?? 1)} style={({ pressed }) => [styles.qtyBtn, quantity >= (selectedVariant?.stock ?? 1) && { opacity: 0.3 }, pressed && { opacity: 0.6 }]}>
                <Plus size={18} color={Colors.deepViolet} strokeWidth={2.5} />
              </Pressable>
              {selectedVariant && selectedVariant.stock <= 5 && selectedVariant.stock > 0 && (
                <Text size={13} color="warning" style={{ marginLeft: Spacing.md }}>Only {selectedVariant.stock} left!</Text>
              )}
            </View>
          </View>

          {/* Trust badges */}
          <View style={styles.trustRow}>
            <View style={styles.trustItem}><Truck size={18} color={Colors.deepViolet} strokeWidth={2} /><Text size={12} color="inkLight" style={{ marginTop: 4 }}>Free delivery over GH₵500</Text></View>
            <View style={styles.trustItem}><RefreshCw size={18} color={Colors.deepViolet} strokeWidth={2} /><Text size={12} color="inkLight" style={{ marginTop: 4 }}>7-day returns</Text></View>
            <View style={styles.trustItem}><Shield size={18} color={Colors.deepViolet} strokeWidth={2} /><Text size={12} color="inkLight" style={{ marginTop: 4 }}>Secure payment</Text></View>
          </View>

          {/* Expandable sections */}
          <View style={styles.detailsSection}>
            {(['description', 'details', 'care'] as const).map((section) => {
              const labels = { description: 'Description', details: 'Product Details', care: 'Care Guide' };
              const contents = {
                description: product.description,
                details: `Dimensions: ${product.dimensions}\nMaterial: ${product.material}`,
                care: product.care,
              };
              const isExpanded = expandedSection === section;
              return (
                <View key={section} style={styles.accordionItem}>
                  <Pressable onPress={() => setExpandedSection(isExpanded ? null : section)} style={styles.accordionHeader}>
                    <Text size={15} weight="semiBold" color="ink">{labels[section]}</Text>
                    <Plus size={18} color={Colors.inkMuted} strokeWidth={2} style={{ transform: [{ rotate: isExpanded ? '45deg' : '0deg' }] }} />
                  </Pressable>
                  {isExpanded && <Text size={14} color="inkLight" style={styles.accordionContent}>{contents[section]}</Text>}
                </View>
              );
            })}
          </View>

          {/* Related Products */}
          {related.length > 0 && (
            <View style={{ marginTop: Spacing.xl }}>
              <Text style={{ ...Typography.label, color: Colors.deepViolet, marginBottom: Spacing.md }}>YOU MIGHT ALSO LIKE</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.md, paddingHorizontal: contentPadding }}>
                {related.map((item) => (
                  <View key={item.id} style={{ width: horizontalCardWidth }}>
                    <OWProductCard product={item} />
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky Add to Bag */}
      <View style={[styles.stickyBar, { paddingBottom: insets.bottom || Spacing.md }]}>
        <View style={styles.stickyPrice}>
          <Text size={12} color="inkMuted">Total</Text>
          <Text size={18} weight="bold" color="deepViolet">{formatPrice(displayPrice * quantity)}</Text>
        </View>
        <OWButton label={isSoldOut ? "Sold Out" : "Add to Bag"} onPress={handleAddToBag} disabled={isSoldOut} size="lg" style={{ flex: 1, marginLeft: Spacing.md }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  navBar: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', ...Shadows.header },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', ...Shadows.header },
  imageContainer: { position: 'relative', backgroundColor: Colors.lavenderWhite },
  productImage: { resizeMode: 'cover' },
  imageDots: { position: 'absolute', bottom: Spacing.md, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.5)' },
  dotActive: { backgroundColor: Colors.deepViolet, width: 20 },
  newBadge: { position: 'absolute', top: Spacing.md, left: Spacing.md },
  infoSection: { paddingTop: Spacing.lg },
  ratingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: Spacing.sm },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.sm },
  originalPrice: { textDecorationLine: 'line-through' },
  section: { marginTop: Spacing.lg },
  colorOptions: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  colorSwatch: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, padding: 3, borderColor: 'transparent' },
  colorSwatchActive: { borderWidth: 2, borderColor: Colors.deepViolet },
  colorFill: { width: '100%', height: '100%', borderRadius: 16 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginTop: Spacing.sm },
  qtyBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.lavenderWhite, alignItems: 'center', justifyContent: 'center' },
  trustRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.xl, paddingVertical: Spacing.md, borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.border },
  trustItem: { alignItems: 'center', flex: 1 },
  detailsSection: { marginTop: Spacing.lg },
  accordionItem: { borderBottomWidth: 1, borderBottomColor: Colors.border, paddingVertical: Spacing.md },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  accordionContent: { marginTop: Spacing.sm, lineHeight: 22 },
  stickyBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, paddingHorizontal: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.border, ...Shadows.floating },
  stickyPrice: { alignItems: 'flex-start' },
});
