import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, DisplayText } from '@/src/components/OWText';
import { OWProductCard } from '@/src/components/OWProductCard';
import { OWEmptyState } from '@/src/components/OWEmptyState';
import { Heart } from 'lucide-react-native';
import { Colors, Spacing } from '@/src/theme/tokens';
import { useResponsive } from '@/src/hooks/useResponsive';
import { api } from '@/src/services/api';
import { useWishlist } from '@/src/state/WishlistContext';
import type { Product } from '@/src/types';

export default function WishlistScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { items } = useWishlist();
  const { columns, contentPadding } = useResponsive();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const all = await api.getProducts();
      const wishlisted = items.map((i) => all.find((p) => p.id === i.productId)).filter(Boolean) as Product[];
      setProducts(wishlisted);
    } catch {
      // ignore
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [items]);

  useEffect(() => { load(); }, [load]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={[styles.header, { paddingHorizontal: contentPadding }]}>
        <DisplayText size={28}>Your Saved Wows</DisplayText>
        {products.length > 0 && <Text size={14} color="inkMuted" style={{ marginTop: 4 }}>{products.length} {products.length === 1 ? 'piece' : 'pieces'}</Text>}
      </View>

      {products.length === 0 && !loading ? (
        <OWEmptyState title="Nothing saved yet." message="Tap the heart on any product to save it here." ctaLabel="Find Your Wow" onCtaPress={() => router.push('/(tabs)')} icon={Heart} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          key={`wl-${columns}`}
          numColumns={columns}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: contentPadding, gap: Spacing.md }}
          contentContainerStyle={{ paddingBottom: Spacing.xxxl }}
          renderItem={({ item }) => <OWProductCard product={item} />}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} tintColor={Colors.deepViolet} colors={[Colors.electricLime]} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  header: { paddingVertical: Spacing.lg },
});
