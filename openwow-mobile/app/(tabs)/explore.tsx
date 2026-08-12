import { useState, useEffect, useCallback } from 'react';
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
import { Text, DisplayText } from '@/src/components/OWText';
import { OWErrorState } from '@/src/components/OWErrorState';
import { OWSkeleton } from '@/src/components/OWSkeleton';
import { Colors, Spacing, Typography } from '@/src/theme/tokens';
import { useResponsive } from '@/src/hooks/useResponsive';
import { ArrowRight, ChevronRight } from 'lucide-react-native';
import { api } from '@/src/services/api';
import type { Category, Collection } from '@/src/types';

export default function ExploreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { contentPadding, isTablet } = useResponsive();

  const load = useCallback(async () => {
    try {
      setError(false);

      const [cats, cols] = await Promise.all([
        api.getCategories(),
        api.getCollections(),
      ]);

      setCategories(cats);
      setCollections(cols);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View
          style={[
            styles.loadingHeader,
            { paddingHorizontal: contentPadding },
          ]}
        >
          <OWSkeleton width="45%" height={38} />
          <OWSkeleton
            width="65%"
            height={16}
            style={{ marginTop: Spacing.sm }}
          />
        </View>

        <View
          style={{
            paddingHorizontal: contentPadding,
            marginTop: Spacing.xl,
            gap: Spacing.md,
          }}
        >
          <OWSkeleton width="100%" height={210} radius={24} />

          <View style={{ flexDirection: 'row', gap: Spacing.md }}>
            <OWSkeleton
              width={150}
              height={150}
              radius={20}
              style={{ flex: 1 }}
            />
            <OWSkeleton
              width={150}
              height={150}
              radius={20}
              style={{ flex: 1 }}
            />
          </View>

          <OWSkeleton width="100%" height={180} radius={24} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        <OWErrorState onRetry={load} />
      </View>
    );
  }

  const featuredCategory = categories[0];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={[{}]}
        keyExtractor={() => 'explore'}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              load();
            }}
            tintColor={Colors.deepViolet}
            colors={[Colors.electricLime]}
          />
        }
        renderItem={() => (
          <View style={{ paddingBottom: Spacing.xxxl }}>

            {/* ───────────────── HEADER ───────────────── */}
            <View
              style={[
                styles.header,
                {
                  paddingHorizontal: contentPadding,
                  paddingTop: Spacing.lg,
                },
              ]}
            >
             

              <DisplayText size={36} style={styles.title}>
                Explore
              </DisplayText>

              <Text
                size={15}
                color="inkMuted"
                style={styles.subtitle}
              >
                Discover pieces, collections and styles worth
                adding to your world.
              </Text>
            </View>

            {/* ───────────────── CATEGORIES ───────────────── */}
            <View style={{ marginTop: Spacing.xl }}>
              <View
                style={[
                  styles.sectionHeader,
                  { paddingHorizontal: contentPadding },
                ]}
              >
                <View>
                  <Text
                    size={20}
                    style={styles.sectionTitle}
                  >
                    Shop by category
                  </Text>

                  <Text
                    size={13}
                    color="inkMuted"
                    style={{ marginTop: 3 }}
                  >
                    Find exactly what you're looking for
                  </Text>
                </View>

                <Pressable
                  onPress={() => {}}
                  hitSlop={10}
                  style={({ pressed }) => [
                    styles.seeAllButton,
                    pressed && { opacity: 0.6 },
                  ]}
                >
                  <Text size={13} style={styles.seeAllText}>
                    See all
                  </Text>

                  <ChevronRight
                    size={16}
                    color={Colors.deepViolet}
                  />
                </Pressable>
              </View>

              <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: contentPadding,
                  paddingTop: Spacing.md,
                  gap: Spacing.md,
                }}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() =>
                      router.push(`/category/${item.slug}`)
                    }
                    style={({ pressed }) => [
                      styles.categoryCard,
                      isTablet && styles.categoryCardTablet,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Image
                      source={{ uri: item.heroImage }}
                      style={StyleSheet.absoluteFillObject}
                      resizeMode="cover"
                    />

                    <View style={styles.categoryGradient} />

                    <View style={styles.categoryContent}>
                      <View style={styles.categoryIcon}>
                        <ArrowRight
                          size={16}
                          color={Colors.deepViolet}
                          strokeWidth={2.5}
                        />
                      </View>

                      <View>
                        <Text
                          style={styles.categoryName}
                          numberOfLines={1}
                        >
                          {item.name}
                        </Text>

                        <Text
                          size={11}
                          color="white"
                          style={styles.categoryDescription}
                          numberOfLines={1}
                        >
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                )}
              />
            </View>

            {/* ───────────────── FEATURED ───────────────── */}
            {featuredCategory && (
              <View
                style={{
                  marginTop: Spacing.xxl,
                  paddingHorizontal: contentPadding,
                }}
              >
                <View style={styles.sectionHeader}>
                  <View>
                    <Text
                      size={20}
                      style={styles.sectionTitle}
                    >
                      Featured
                    </Text>

                    <Text
                      size={13}
                      color="inkMuted"
                      style={{ marginTop: 3 }}
                    >
                      A little something special
                    </Text>
                  </View>
                </View>

                <Pressable
                  onPress={() =>
                    router.push(
                      `/category/${featuredCategory.slug}`
                    )
                  }
                  style={({ pressed }) => [
                    styles.featuredCard,
                    isTablet && styles.featuredCardTablet,
                    pressed && styles.pressed,
                  ]}
                >
                  <Image
                    source={{
                      uri: featuredCategory.heroImage,
                    }}
                    style={StyleSheet.absoluteFillObject}
                    resizeMode="cover"
                  />

                  <View style={styles.featuredOverlay} />

                  <View style={styles.featuredContent}>
                    <View style={styles.featuredBadge}>
                     

                      <Text style={styles.featuredBadgeText}>
                        EDITOR'S PICK
                      </Text>
                    </View>

                    <Text
                      style={styles.featuredTitle}
                    >
                      {featuredCategory.name}
                    </Text>

                    <Text
                      size={14}
                      color="white"
                      style={styles.featuredDescription}
                      numberOfLines={2}
                    >
                      {featuredCategory.description}
                    </Text>

                    <View style={styles.exploreButton}>
                      <Text
                        size={13}
                        style={styles.exploreButtonText}
                      >
                        Explore collection
                      </Text>

                      <ArrowRight
                        size={16}
                        color={Colors.deepViolet}
                        strokeWidth={2.5}
                      />
                    </View>
                  </View>
                </Pressable>
              </View>
            )}

            {/* ───────────────── COLLECTIONS ───────────────── */}
            <View
              style={[
                styles.collectionsSection,
                { paddingHorizontal: contentPadding },
              ]}
            >
              <View style={styles.sectionHeader}>
                <View>
                  <Text
                    size={20}
                    style={styles.sectionTitle}
                  >
                    Collections
                  </Text>

                  <Text
                    size={13}
                    color="inkMuted"
                    style={{ marginTop: 3 }}
                  >
                    Curated looks you'll love
                  </Text>
                </View>

                <Pressable
                  hitSlop={10}
                  style={({ pressed }) => [
                    styles.seeAllButton,
                    pressed && { opacity: 0.6 },
                  ]}
                >
                  <Text size={13} style={styles.seeAllText}>
                    View all
                  </Text>

                  <ChevronRight
                    size={16}
                    color={Colors.deepViolet}
                  />
                </Pressable>
              </View>

              <View
                style={[
                  styles.collectionGrid,
                  isTablet && styles.collectionGridTablet,
                ]}
              >
                {collections.map((collection, index) => (
                  <Pressable
                    key={collection.id}
                    onPress={() =>
                      router.push(
                        `/collection/${collection.id}`
                      )
                    }
                    style={({ pressed }) => [
                      styles.collectionCard,
                      isTablet && styles.collectionCardTablet,
                      index === 0 && styles.collectionCardLarge,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Image
                      source={{
                        uri: collection.heroImage,
                      }}
                      style={StyleSheet.absoluteFillObject}
                      resizeMode="cover"
                    />

                    <View style={styles.collectionOverlay} />

                    <View style={styles.collectionContent}>
                      <Text
                        style={styles.collectionName}
                        numberOfLines={2}
                      >
                        {collection.name}
                      </Text>

                      <Text
                        size={11}
                        color="white"
                        style={styles.collectionDescription}
                        numberOfLines={1}
                      >
                        {collection.description}
                      </Text>

                      <View style={styles.collectionArrow}>
                        <ArrowRight
                          size={15}
                          color={Colors.deepViolet}
                          strokeWidth={2.5}
                        />
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* ───────────────── BOTTOM MESSAGE ───────────────── */}
            <View
              style={[
                styles.bottomBanner,
                {
                  marginHorizontal: contentPadding,
                },
              ]}
            >
             

              <View style={{ flex: 1 }}>
                <Text
                  size={15}
                  style={styles.bannerTitle}
                >
                  There's more to discover.
                </Text>

                <Text
                  size={12}
                  color="white"
                  style={styles.bannerSubtitle}
                >
                  Keep exploring and find your next wow.
                </Text>
              </View>

              <ArrowRight
                size={19}
                color={Colors.electricLime}
              />
            </View>
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

  loadingHeader: {
    paddingTop: Spacing.xl,
  },

  header: {
    paddingBottom: Spacing.sm,
  },

  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.sm,
  },

  eyebrowText: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.deepViolet,
    letterSpacing: 1.2,
  },

  title: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.deepViolet,
    letterSpacing: -1,
  },

  subtitle: {
    maxWidth: 400,
    lineHeight: 22,
    marginTop: 5,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.deepViolet,
  },

  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },

  seeAllText: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.deepViolet,
  },

  /* Categories */

  categoryCard: {
    width: 170,
    height: 185,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
  },

  categoryCardTablet: {
    width: 210,
    height: 210,
  },

  categoryGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 20, 32, 0.38)',
  },

  categoryContent: {
    position: 'absolute',
    left: Spacing.md,
    right: Spacing.md,
    bottom: Spacing.md,
    gap: Spacing.sm,
  },

  categoryIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.electricLime,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  categoryName: {
    color: Colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
  },

  categoryDescription: {
    opacity: 0.85,
    marginTop: 2,
  },

  /* Featured */

  featuredCard: {
    height: 300,
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: Spacing.md,
    position: 'relative',
  },

  featuredCardTablet: {
    height: 380,
  },

  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 20, 32, 0.46)',
  },

  featuredContent: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    bottom: Spacing.lg,
  },

  featuredBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.electricLime,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: Spacing.sm,
  },

  featuredBadgeText: {
    fontSize: 10,
    fontFamily: 'Montserrat-Bold',
    color: Colors.deepViolet,
    letterSpacing: 0.8,
  },

  featuredTitle: {
    color: Colors.white,
    fontSize: 30,
    lineHeight: 35,
    fontFamily: 'Montserrat-Bold',
  },

  featuredDescription: {
    lineHeight: 20,
    opacity: 0.9,
    marginTop: 4,
    maxWidth: 500,
  },

  exploreButton: {
    alignSelf: 'flex-start',
    marginTop: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 22,
  },

  exploreButtonText: {
    color: Colors.deepViolet,
    fontFamily: 'Montserrat-Bold',
  },

  /* Collections */

  collectionsSection: {
    marginTop: Spacing.xxl,
  },

  collectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },

  collectionGridTablet: {
    gap: Spacing.lg,
  },

  collectionCard: {
    width: '47%',
    height: 190,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },

  collectionCardTablet: {
    width: '31%',
    height: 220,
  },

  collectionCardLarge: {
    width: '100%',
    height: 220,
  },

  collectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 20, 32, 0.38)',
  },

  collectionContent: {
    position: 'absolute',
    left: Spacing.md,
    right: Spacing.md,
    bottom: Spacing.md,
  },

  collectionName: {
    color: Colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
    lineHeight: 21,
  },

  collectionDescription: {
    opacity: 0.85,
    marginTop: 3,
  },

  collectionArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.electricLime,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

  /* Bottom banner */

  bottomBanner: {
    marginTop: Spacing.xxl,
    backgroundColor: Colors.deepViolet,
    borderRadius: 22,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },

  bannerTitle: {
    color: Colors.white,
    fontFamily: 'Montserrat-Bold',
  },

  bannerSubtitle: {
    opacity: 0.7,
    marginTop: 2,
  },

  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
});