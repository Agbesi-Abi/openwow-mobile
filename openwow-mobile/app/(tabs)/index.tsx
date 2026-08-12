
import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Search,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from 'lucide-react-native';

import { OWHeader } from '@/src/components/OWHeader';
import { OWSearchBar } from '@/src/components/OWSearchBar';
import { OWProductCard } from '@/src/components/OWProductCard';
import { OWSectionHeader } from '@/src/components/OWSectionHeader';
import { ProductGridSkeleton } from '@/src/components/OWSkeleton';
import { OWErrorState } from '@/src/components/OWErrorState';
import { Text, DisplayText } from '@/src/components/OWText';

import {
  Colors,
  Spacing,
  Typography,
} from '@/src/theme/tokens';

import { useResponsive } from '@/src/hooks/useResponsive';
import { api } from '@/src/services/api';
import { useRecentlyViewed } from '@/src/state/RecentlyViewedContext';
import { useAuth } from '@/src/state/AuthContext';

import type {
  Product,
  Category,
  Collection,
} from '@/src/types';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { user } = useAuth();
  const { productIds } = useRecentlyViewed();

  const {
    columns,
    horizontalCardWidth,
    contentPadding,
    isTablet,
  } = useResponsive();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';

    return 'Good evening';
  }, []);

  const loadAll = useCallback(async () => {
    try {
      setError(false);

      const [
        nw,
        tr,
        ft,
        cats,
        cols,
      ] = await Promise.all([
        api.getNewArrivals(),
        api.getTrendingProducts(),
        api.getFeaturedProducts(),
        api.getCategories(),
        api.getCollections(),
      ]);

      setNewArrivals(nw);
      setTrending(tr);
      setFeatured(ft);
      setCategories(cats);
      setCollections(cols);

      if (productIds.length > 0) {
        const all = await api.getProducts();

        const recent = productIds
          .map((id) => all.find((p) => p.id === id))
          .filter(Boolean) as Product[];

        setRecentlyViewed(recent);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [productIds]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAll();
  }, [loadAll]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: insets.top },
        ]}
      >
        <OWHeader />

        <View style={styles.loadingContainer}>
          <ProductGridSkeleton count={4} />
          <ProductGridSkeleton count={4} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: insets.top },
        ]}
      >
        <OWHeader />

        <OWErrorState
          message="We couldn't load this wow. Try again."
          onRetry={loadAll}
        />
      </View>
    );
  }

  const featuredCollection = collections[0];

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
      ]}
    >
      <OWHeader />

      <FlatList
        data={[{}]}
        keyExtractor={() => 'home'}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.deepViolet}
            colors={[Colors.electricLime]}
          />
        }
        renderItem={() => (
          <View style={styles.page}>

            {/* ================================================= */}
            {/* WELCOME */}
            {/* ================================================= */}

            <View
              style={[
                styles.welcome,
                {
                  paddingHorizontal: contentPadding,
                },
              ]}
            >
             

              <Text
                size={14}
                color="inkMuted"
              >
                {greeting}
                {user ? `, ${user.name?.split(' ')[0]}` : ''}
              </Text>

              <DisplayText
                size={34}
                style={styles.welcomeTitle}
              >
                Discover something
              </DisplayText>

              <DisplayText
                size={34}
                style={styles.welcomeAccent}
              >
                you'll love.
              </DisplayText>
            </View>

            {/* ================================================= */}
            {/* SEARCH */}
            {/* ================================================= */}

            <Pressable
              onPress={() => router.push('/search')}
              style={[
                styles.searchWrapper,
                {
                  marginHorizontal: contentPadding,
                },
              ]}
            >
              <View pointerEvents="none">
                <OWSearchBar
                  placeholder="Search handbags, shoes, accessories..."
                  editable={false}
                />
              </View>
            </Pressable>

            {/* ================================================= */}
            {/* NEW ARRIVALS */}
            {/* ================================================= */}

            <View style={styles.section}>
              <View
                style={[
                  styles.sectionHeading,
                  {
                    paddingHorizontal: contentPadding,
                  },
                ]}
              >
                <View>
                  <Text style={styles.sectionTitle}>
                    New arrivals
                  </Text>

                  <Text
                    size={13}
                    color="inkMuted"
                    style={styles.sectionSubtitle}
                  >
                    Fresh pieces just landed
                  </Text>
                </View>

                <Pressable
                  onPress={() => router.push('/search')}
                  style={styles.viewAll}
                >
                  <Text style={styles.viewAllText}>
                    See all
                  </Text>

                  <ChevronRight
                    size={17}
                    color={Colors.deepViolet}
                  />
                </Pressable>
              </View>

              <FlatList
                horizontal
                data={newArrivals}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                  styles.horizontalList,
                  {
                    paddingHorizontal: contentPadding,
                  },
                ]}
                renderItem={({ item }) => (
                  <OWProductCard
                    product={item}
                    style={{
                      width: horizontalCardWidth,
                      marginBottom: 0,
                    }}
                  />
                )}
              />
            </View>

            {/* ================================================= */}
            {/* CATEGORIES */}
            {/* ================================================= */}

            <View style={styles.categorySection}>
              <View
                style={[
                  styles.sectionHeading,
                  {
                    paddingHorizontal: contentPadding,
                  },
                ]}
              >
                <View>
                  <Text style={styles.sectionTitle}>
                    Shop by category
                  </Text>

                  <Text
                    size={13}
                    color="inkMuted"
                    style={styles.sectionSubtitle}
                  >
                    Find your kind of wow
                  </Text>
                </View>

                <Pressable
                  onPress={() =>
                    router.push('/(tabs)/explore')
                  }
                  style={styles.viewAll}
                >
                  <Text style={styles.viewAllText}>
                    Explore
                  </Text>

                  <ChevronRight
                    size={17}
                    color={Colors.deepViolet}
                  />
                </Pressable>
              </View>

              <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                  styles.horizontalList,
                  {
                    paddingHorizontal: contentPadding,
                  },
                ]}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() =>
                      router.push(
                        `/category/${item.slug}`
                      )
                    }
                    style={({ pressed }) => [
                      styles.categoryCard,
                      {
                        width: isTablet ? 190 : 135,
                      },
                      pressed && styles.pressed,
                    ]}
                  >
                    <Image
                      source={{
                        uri: item.heroImage,
                      }}
                      style={StyleSheet.absoluteFillObject}
                      resizeMode="cover"
                    />

                    <View
                      style={styles.categoryShade}
                    />

                    <View
                      style={styles.categoryContent}
                    >
                      <View
                        style={styles.categoryArrow}
                      >
                        <ArrowRight
                          size={15}
                          color={Colors.deepViolet}
                          strokeWidth={2.5}
                        />
                      </View>

                      <Text
                        style={styles.categoryName}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </Pressable>
                )}
              />
            </View>

            {/* ================================================= */}
            {/* FEATURED COLLECTION */}
            {/* ================================================= */}

            {featuredCollection && (
              <View
                style={[
                  styles.featuredSection,
                  {
                    paddingHorizontal:
                      contentPadding,
                  },
                ]}
              >
                <View style={styles.featuredLabel}>
                  <View
                    style={styles.featuredDot}
                  />

                  <Text style={styles.featuredLabelText}>
                    FEATURED COLLECTION
                  </Text>
                </View>

                <Pressable
                  onPress={() =>
                    router.push(
                      `/collection/${featuredCollection.id}`
                    )
                  }
                  style={({ pressed }) => [
                    styles.hero,
                    isTablet && styles.heroTablet,
                    pressed && styles.pressed,
                  ]}
                >
                  <Image
                    source={{
                      uri: featuredCollection.heroImage,
                    }}
                    style={StyleSheet.absoluteFillObject}
                    resizeMode="cover"
                  />

                  <View style={styles.heroShade} />

                  <View style={styles.heroContent}>
                    <Text
                      style={styles.heroTitle}
                      numberOfLines={2}
                    >
                      {featuredCollection.name}
                    </Text>

                    <Text
                      size={14}
                      color="white"
                      style={styles.heroDescription}
                      numberOfLines={2}
                    >
                      {featuredCollection.description}
                    </Text>

                    <View style={styles.heroButton}>
                      <Text style={styles.heroButtonText}>
                        Explore
                      </Text>

                      <ArrowRight
                        size={17}
                        color={Colors.deepViolet}
                        strokeWidth={2.5}
                      />
                    </View>
                  </View>
                </Pressable>
              </View>
            )}

            {/* ================================================= */}
            {/* TRENDING */}
            {/* ================================================= */}

            <View style={styles.trendingSection}>
              <View
                style={[
                  styles.sectionHeading,
                  {
                    paddingHorizontal: contentPadding,
                  },
                ]}
              >
                <View>
                  <Text style={styles.sectionTitle}>
                    Trending now
                  </Text>

                  <Text
                    size={13}
                    color="inkMuted"
                    style={styles.sectionSubtitle}
                  >
                    Everyone is talking about these
                  </Text>
                </View>

                <Pressable
                  onPress={() => router.push('/search')}
                  style={styles.viewAll}
                >
                  <Text style={styles.viewAllText}>
                    See all
                  </Text>

                  <ChevronRight
                    size={17}
                    color={Colors.deepViolet}
                  />
                </Pressable>
              </View>

              <View
                style={[
                  styles.grid,
                  {
                    paddingHorizontal:
                      contentPadding,
                  },
                ]}
              >
                {trending
                  .slice(0, columns * 2)
                  .map((item) => (
                    <OWProductCard
                      key={item.id}
                      product={item}
                    />
                  ))}
              </View>
            </View>

            {/* ================================================= */}
            {/* EDITORIAL */}
            {/* ================================================= */}

            <View
              style={[
                styles.editorialSection,
                {
                  paddingHorizontal:
                    contentPadding,
                },
              ]}
            >
              <View
                style={[
                  styles.editorial,
                  isTablet && styles.editorialTablet,
                ]}
              >
                <Image
                  source={{
                    uri:
                      'https://images.pexels.com/photos/16556203/pexels-photo-16556203.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
                  }}
                  style={StyleSheet.absoluteFillObject}
                  resizeMode="cover"
                />

                <View
                  style={styles.editorialShade}
                />

                <View
                  style={styles.editorialContent}
                >
                  <Text
                    style={styles.editorialLabel}
                  >
                    THE OPENWOW EDIT
                  </Text>

                  <DisplayText
                    size={36}
                    color="white"
                    style={styles.editorialTitle}
                  >
                    Meet the{'\n'}new wow.
                  </DisplayText>

                  <Text
                    size={13}
                    color="white"
                    style={styles.editorialCopy}
                  >
                    Style that feels like you.
                  </Text>
                </View>
              </View>
            </View>

            {/* ================================================= */}
            {/* RECENTLY VIEWED */}
            {/* ================================================= */}

            {recentlyViewed.length > 0 && (
              <View
                style={[
                  styles.recentSection,
                  {
                    paddingBottom:
                      Spacing.xxxl,
                  },
                ]}
              >
                <View
                  style={[
                    styles.sectionHeading,
                    {
                      paddingHorizontal:
                        contentPadding,
                    },
                  ]}
                >
                  <View>
                    <Text style={styles.sectionTitle}>
                      Recently viewed
                    </Text>

                    <Text
                      size={13}
                      color="inkMuted"
                      style={styles.sectionSubtitle}
                    >
                      Pick up where you left off
                    </Text>
                  </View>
                </View>

                <FlatList
                  horizontal
                  data={recentlyViewed}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={[
                    styles.horizontalList,
                    {
                      paddingHorizontal:
                        contentPadding,
                    },
                  ]}
                  renderItem={({ item }) => (
                    <OWProductCard
                      product={item}
                      style={{
                        width:
                          horizontalCardWidth,
                        marginBottom: 0,
                      }}
                    />
                  )}
                />
              </View>
            )}

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softWhite,
  },

  page: {
    paddingBottom: Spacing.xxxl,
  },

  loadingContainer: {
    flex: 1,
  },

  /* --------------------------------------------------------- */
  /* WELCOME */
  /* --------------------------------------------------------- */

  welcome: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },

  welcomeEyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.sm,
  },

  eyebrowText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
    letterSpacing: 1.1,
    color: Colors.deepViolet,
  },

  welcomeTitle: {
    color: Colors.deepViolet,
    fontFamily: 'Montserrat-Bold',
    marginTop: 4,
    letterSpacing: -1,
  },

  welcomeAccent: {
    color: Colors.deepViolet,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: -1,
  },

  /* --------------------------------------------------------- */
  /* SEARCH */
  /* --------------------------------------------------------- */

  searchWrapper: {
    marginBottom: Spacing.xl,
  },

  /* --------------------------------------------------------- */
  /* SECTIONS */
  /* --------------------------------------------------------- */

  section: {
    marginBottom: Spacing.xxl,
  },

  categorySection: {
    marginBottom: Spacing.xxl,
  },

  trendingSection: {
    marginBottom: Spacing.xxl,
  },

  recentSection: {
    marginTop: Spacing.xxl,
  },

  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },

  sectionTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: Colors.deepViolet,
  },

  sectionSubtitle: {
    marginTop: 3,
  },

  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },

  viewAllText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: Colors.deepViolet,
  },

  horizontalList: {
    gap: Spacing.md,
  },

  /* --------------------------------------------------------- */
  /* CATEGORY */
  /* --------------------------------------------------------- */

  categoryCard: {
    height: 155,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },

  categoryShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:
      'rgba(27, 20, 32, 0.30)',
  },

  categoryContent: {
    position: 'absolute',
    left: Spacing.md,
    right: Spacing.md,
    bottom: Spacing.md,
  },

  categoryArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.electricLime,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: Spacing.sm,
  },

  categoryName: {
    color: Colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },

  /* --------------------------------------------------------- */
  /* FEATURED */
  /* --------------------------------------------------------- */

  featuredSection: {
    marginBottom: Spacing.xxl,
  },

  featuredLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.sm,
  },

  featuredDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.electricLime,
  },

  featuredLabelText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
    letterSpacing: 1,
    color: Colors.deepViolet,
  },

  hero: {
    height: 285,
    borderRadius: 26,
    overflow: 'hidden',
    position: 'relative',
  },

  heroTablet: {
    height: 380,
  },

  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:
      'rgba(27, 20, 32, 0.42)',
  },

  heroContent: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    bottom: Spacing.lg,
  },

  heroTitle: {
    color: Colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    lineHeight: 35,
    maxWidth: 500,
  },

  heroDescription: {
    opacity: 0.9,
    lineHeight: 20,
    marginTop: 5,
    maxWidth: 480,
  },

  heroButton: {
    marginTop: Spacing.md,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.electricLime,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 24,
  },

  heroButtonText: {
    color: Colors.deepViolet,
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
  },

  /* --------------------------------------------------------- */
  /* PRODUCT GRID */
  /* --------------------------------------------------------- */

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },

  /* --------------------------------------------------------- */
  /* EDITORIAL */
  /* --------------------------------------------------------- */

  editorialSection: {
    marginBottom: Spacing.xxl,
  },

  editorial: {
    height: 300,
    borderRadius: 26,
    overflow: 'hidden',
    position: 'relative',
  },

  editorialTablet: {
    height: 380,
  },

  editorialShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:
      'rgba(27, 20, 32, 0.45)',
  },

  editorialContent: {
    position: 'absolute',
    left: Spacing.lg,
    bottom: Spacing.lg,
  },

  editorialLabel: {
    color: Colors.electricLime,
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
    letterSpacing: 1.2,
  },

  editorialTitle: {
    marginTop: 8,
    lineHeight: 40,
  },

  editorialCopy: {
    opacity: 0.85,
    marginTop: 5,
  },

  /* --------------------------------------------------------- */
  /* INTERACTION */
  /* --------------------------------------------------------- */

  pressed: {
    opacity: 0.88,
    transform: [
      {
        scale: 0.99,
      },
    ],
  },
});
