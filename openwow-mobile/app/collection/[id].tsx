import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Pressable, Image, RefreshControl } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Text, DisplayText } from '@/src/components/OWText';
import { OWProductCard } from '@/src/components/OWProductCard';
import { ProductGridSkeleton } from '@/src/components/OWSkeleton';
import { OWErrorState } from '@/src/components/OWErrorState';
import { Colors, Spacing, Typography } from '@/src/theme/tokens';
import { useResponsive } from '@/src/hooks/useResponsive';
import { api } from '@/src/services/api';
import type { Product, Collection } from '@/src/types';

export default function CollectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { columns, contentPadding } = useResponsive();

  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(false);
      const col = await api.getCollection(id);
      setCollection(col);
      if (col) {
        const all = await api.getProducts();
        setProducts(col.productIds.map((pid) => all.find((p) => p.id === pid)).filter(Boolean) as Product[]);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.navBar}><ChevronLeft size={24} color={Colors.deepViolet} onPress={() => router.back()} /></View>
        <ProductGridSkeleton count={4} />
      </View>
    );
  }

  if (error || !collection) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.navBar}><ChevronLeft size={24} color={Colors.deepViolet} onPress={() => router.back()} /></View>
        <OWErrorState onRetry={load} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}><ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} /></Pressable>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        key={`col-${columns}`}
        numColumns={columns}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: contentPadding, gap: Spacing.md }}
        contentContainerStyle={{ paddingBottom: Spacing.xxxl }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} tintColor={Colors.deepViolet} colors={[Colors.electricLime]} />}
        ListHeaderComponent={() => (
          <View>
            <View style={[styles.heroContainer, { marginHorizontal: contentPadding }]}>
              <Image source={{ uri: collection.heroImage }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
              <View style={styles.heroOverlay}>
                <Text style={{ ...Typography.label, color: Colors.electricLime }}>COLLECTION</Text>
                <DisplayText size={32} color="white" style={{ marginTop: 4 }}>{collection.name}</DisplayText>
                <Text size={14} color="white" style={{ opacity: 0.85, marginTop: 4 }}>{collection.description}</Text>
              </View>
            </View>
            <Text size={13} color="inkMuted" style={{ paddingHorizontal: contentPadding, paddingTop: Spacing.lg }}>{products.length} {products.length === 1 ? 'piece' : 'pieces'}</Text>
          </View>
        )}
        renderItem={({ item }) => <OWProductCard product={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  navBar: { height: 52, flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  heroContainer: { height: 200, borderRadius: 16, overflow: 'hidden', position: 'relative' },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, justifyContent: 'flex-end', padding: Spacing.lg, backgroundColor: 'rgba(41, 33, 61, 0.55)' },
});
