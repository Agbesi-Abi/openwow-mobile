import { useRef } from 'react';
import { Pressable, Image, StyleSheet, View, Animated, type ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { Colors, Radius, Spacing, Shadows, formatPrice } from '@/src/theme/tokens';
import { Text } from './OWText';
import { OWBadge } from './OWBadge';
import { useWishlist } from '@/src/state/WishlistContext';
import { hapticImpact } from '@/src/utils/haptics';
import { useResponsive } from '@/src/hooks/useResponsive';
import type { Product } from '@/src/types';

interface OWProductCardProps { product: Product; style?: ViewStyle; }

export function OWProductCard({ product, style }: OWProductCardProps) {
  const router = useRouter();
  const { hasItem, toggleItem } = useWishlist();
  const saved = hasItem(product.id);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { cardWidth } = useResponsive();

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 4 }).start();
  };

  return (
    <Pressable onPress={() => router.push(`/product/${product.id}`)} onPressIn={handlePressIn} onPressOut={handlePressOut} style={[styles.container, { width: cardWidth }, style]}>
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }, Shadows.card]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.images[0] }} style={styles.image} resizeMode="cover" />
          {product.isNew && !product.isSoldOut && <View style={styles.newBadge}><OWBadge label="New" variant="new" /></View>}
          {product.isSoldOut && <View style={styles.soldoutOverlay}><OWBadge label="Sold Out" variant="soldout" /></View>}
          <Pressable onPress={() => { hapticImpact('light'); toggleItem(product.id); }} style={({ pressed }) => [styles.heartButton, pressed && { opacity: 0.6 }]} accessibilityLabel={saved ? 'Remove from wishlist' : 'Add to wishlist'}>
            <Heart size={20} color={saved ? Colors.deepViolet : Colors.inkMuted} fill={saved ? Colors.deepViolet : 'transparent'} strokeWidth={2} />
          </Pressable>
        </View>
        <View style={styles.info}>
          <Text weight="bold" size={15} color="ink">{product.name}</Text>
          <Text size={13} color="inkMuted" style={styles.subtitle}>{product.subtitle}</Text>
          <View style={styles.bottomRow}>
            <View style={styles.priceRow}>
              <Text weight="bold" size={15} color={product.salePrice ? 'error' : 'ink'}>{formatPrice(product.salePrice ?? product.price)}</Text>
              {product.salePrice && <Text size={13} color="inkMuted" style={styles.originalPrice}>{formatPrice(product.price)}</Text>}
            </View>
            <View style={styles.colorDots}>
              {product.colors.slice(0, 4).map((c, i) => (
                <View key={i} style={[styles.colorDot, { backgroundColor: c.hex, marginLeft: i > 0 ? -3 : 0 }]} />
              ))}
            </View>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.lg },
  card: { borderRadius: Radius.lg, overflow: 'hidden' as const, backgroundColor: 'transparent' as const },
  imageContainer: { position: 'relative', width: '100%', aspectRatio: 0.75, borderRadius: Radius.lg, overflow: 'hidden', backgroundColor: Colors.lavenderWhite, marginBottom: Spacing.sm + 2 },
  image: { width: '100%', height: '100%' },
  newBadge: { position: 'absolute', top: Spacing.sm, left: Spacing.sm, zIndex: 2 },
  soldoutOverlay: { position: 'absolute', top: Spacing.sm, left: Spacing.sm, zIndex: 2 },
  heartButton: { position: 'absolute', top: Spacing.sm, right: Spacing.sm, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(252, 251, 255, 0.9)', alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  info: { paddingHorizontal: Spacing.xs },
  subtitle: { marginTop: 2, marginBottom: Spacing.sm },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  originalPrice: { textDecorationLine: 'line-through' },
  colorDots: { flexDirection: 'row', alignItems: 'center' },
  colorDot: { width: 12, height: 12, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' },
});
