import { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, FlatList, Pressable, Text as RNText, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, X, Search as SearchIcon } from 'lucide-react-native';
import { Text } from '@/src/components/OWText';
import { OWProductCard } from '@/src/components/OWProductCard';
import { OWSearchBar } from '@/src/components/OWSearchBar';
import { OWEmptyState } from '@/src/components/OWEmptyState';
import { Colors, Spacing } from '@/src/theme/tokens';
import { useResponsive } from '@/src/hooks/useResponsive';
import { api } from '@/src/services/api';
import type { Product } from '@/src/types';

const POPULAR_SEARCHES = ['Nova', 'Mini', 'Tote', 'Statement', 'Crossbody', 'Shoulder'];

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { columns, contentPadding } = useResponsive();

  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setSearched(false); return; }
    setLoading(true);
    setSearched(true);
    try {
      const r = await api.searchProducts(q);
      setResults(r);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => { performSearch(query); }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, performSearch]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}><ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} /></Pressable>
        <View style={{ flex: 1 }}>
          <OWSearchBar placeholder="Search handbags..." value={query} onChangeText={setQuery} autoFocus editable onSubmit={() => performSearch(query)} />
        </View>
        {query.length > 0 && (
          <Pressable onPress={() => { setQuery(''); setResults([]); setSearched(false); }} style={styles.clearBtn}>
            <X size={18} color={Colors.inkMuted} strokeWidth={2} />
          </Pressable>
        )}
      </View>

      {!searched ? (
        <View style={{ flex: 1, paddingHorizontal: contentPadding }}>
          <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, letterSpacing: 1.2, color: Colors.deepViolet, marginTop: Spacing.lg }}>POPULAR SEARCHES</Text>
          <View style={styles.chipsContainer}>
            {POPULAR_SEARCHES.map((term) => (
              <Pressable key={term} onPress={() => { setQuery(term); }} style={({ pressed }) => [styles.chip, pressed && { opacity: 0.7 }]}>
                <Text size={14} weight="medium" color="deepViolet">{term}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" color={Colors.deepViolet} /></View>
      ) : results.length === 0 ? (
        <OWEmptyState title="No wows found." message={`We couldn't find anything for "${query}". Try a different search.`} icon={SearchIcon} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          key={`search-${columns}`}
          numColumns={columns}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: contentPadding, gap: Spacing.md }}
          contentContainerStyle={{ paddingBottom: Spacing.xxxl }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <Text size={13} color="inkMuted" style={{ paddingHorizontal: contentPadding, paddingTop: Spacing.md, paddingBottom: Spacing.sm }}>
              {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
            </Text>
          )}
          renderItem={({ item }) => <OWProductCard product={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  navBar: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, gap: Spacing.sm },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  clearBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.md },
  chip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm + 2, borderRadius: 999, backgroundColor: Colors.lavenderWhite },
});
