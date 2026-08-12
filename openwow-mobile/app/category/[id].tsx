import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Pressable, Image, RefreshControl, ScrollView } from 'react-native';
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
import type { Product, Category } from '@/src/types';

export default function CategoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id: slug } = useLocalSearchParams<{ id: string }>();
  const { columns, contentPadding } = useResponsive();

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(false);
      const cats = await api.getCategories();
      const cat = cats.find((c) => c.slug === slug);
      setCategory(cat ?? null);
      const prods = await api.getProductsByCategory(slug);
      setProducts(prods);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [slug]);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.navBar}><ChevronLeft size={24} color={Colors.deepViolet} onPress={() => router.back()} /></View>
        <ProductGridSkeleton count={4} />
      </View>
    );
  }

  if (error || !category) {
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
        key={`cat-${columns}`}
        numColumns={columns}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: contentPadding, gap: Spacing.md }}
        contentContainerStyle={{ paddingBottom: Spacing.xxxl }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} tintColor={Colors.deepViolet} colors={[Colors.electricLime]} />}
        ListHeaderComponent={() => (
          <View style={[styles.header, { paddingHorizontal: contentPadding }]}>
            <Text style={{ ...Typography.label, color: Colors.electricViolet }}>CATEGORY</Text>
            <DisplayText size={36} style={{ marginTop: 4 }}>{category.name}</DisplayText>
            <Text size={15} color="inkMuted" style={{ marginTop: 4 }}>{category.description}</Text>
            <Text size={13} color="inkMuted" style={{ marginTop: 8 }}>{products.length} {products.length === 1 ? 'piece' : 'pieces'}</Text>
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
  header: { paddingVertical: Spacing.lg },
});
