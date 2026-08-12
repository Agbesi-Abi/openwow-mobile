
import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  RefreshControl,
  Animated,
  Easing,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ArrowRight,
  ShoppingBag,
  Trash2,
  Truck,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react-native';

import { Text, DisplayText } from '@/src/components/OWText';
import { OWButton } from '@/src/components/OWButton';
import { OWQuantitySelector } from '@/src/components/OWQuantitySelector';
import { OWEmptyState } from '@/src/components/OWEmptyState';

import {
  Colors,
  Spacing,
  formatPrice,
} from '@/src/theme/tokens';

import { useResponsive } from '@/src/hooks/useResponsive';
import { useCart } from '@/src/state/CartContext';
import { useToast } from '@/src/state/ToastContext';
import { api } from '@/src/services/api';

import type {
  Product,
  CartItem,
} from '@/src/types';


const FREE_DELIVERY_THRESHOLD = 500;


export default function BagScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    items,
    subtotal,
    updateQuantity,
    removeItem,
  } = useCart();

  const { showToast } = useToast();

  const {
    contentPadding,
    isTablet,
  } = useResponsive();

  const [products, setProducts] = useState<
    Record<string, Product>
  >({});

  const [refreshing, setRefreshing] = useState(false);

  const progressAnim = useRef(
    new Animated.Value(0)
  ).current;


  /* ============================================================
     LOAD PRODUCTS
  ============================================================ */

  const load = useCallback(async () => {
    try {
      const all = await api.getProducts();

      const map: Record<string, Product> = {};

      all.forEach((product) => {
        map[product.id] = product;
      });

      setProducts(map);
    } catch {
      // Cart remains usable even if product refresh fails.
    } finally {
      setRefreshing(false);
    }
  }, []);


  useEffect(() => {
    load();
  }, [load]);


  /* ============================================================
     TOTALS
  ============================================================ */

  const deliveryFee =
    subtotal > 0
      ? subtotal >= FREE_DELIVERY_THRESHOLD
        ? 0
        : 20
      : 0;

  const total = subtotal + deliveryFee;

  const remaining = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - subtotal
  );

  const progress = Math.min(
    1,
    subtotal / FREE_DELIVERY_THRESHOLD
  );


  /* ============================================================
     DELIVERY ANIMATION
  ============================================================ */

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 650,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress, progressAnim]);


  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });


  /* ============================================================
     CART ITEM
  ============================================================ */

  const renderItem = ({
    item,
  }: {
    item: CartItem;
  }) => {
    const product = products[item.productId];

    if (!product) return null;

    const variant = product.variants.find(
      (v) => v.id === item.variantId
    );

    const image =
      variant?.image ??
      product.images[0];


    return (
      <View style={styles.cartItem}>

        {/* Product Image */}

        <Pressable
          onPress={() =>
            router.push(`/product/${product.slug}`)
          }
          style={({ pressed }) => [
            styles.imageWrapper,
            pressed && styles.pressed,
          ]}
        >
          <Image
            source={{ uri: image }}
            style={styles.itemImage}
            resizeMode="cover"
          />
        </Pressable>


        {/* Product Details */}

        <View style={styles.itemDetails}>

          <View style={styles.itemTop}>

            <View style={styles.itemNameContainer}>
              <Text
                size={15}
                weight="bold"
                color="ink"
                numberOfLines={2}
                style={styles.productName}
              >
                {product.name}
              </Text>

              <Text
                size={12}
                color="inkMuted"
                style={styles.variantText}
              >
                {item.color}
              </Text>
            </View>


            <Pressable
              onPress={() => {
                removeItem(
                  item.productId,
                  item.variantId
                );

                showToast(
                  'Removed from bag',
                  'info'
                );
              }}
              hitSlop={10}
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.pressed,
              ]}
            >
              <Trash2
                size={17}
                color={Colors.inkMuted}
                strokeWidth={1.8}
              />
            </Pressable>

          </View>


          {/* Price */}

          <Text
            size={16}
            weight="bold"
            color="deepViolet"
            style={styles.price}
          >
            {formatPrice(item.unitPrice)}
          </Text>


          {/* Quantity */}

          <View style={styles.itemBottom}>

            <OWQuantitySelector
              quantity={item.quantity}
              onDecrease={() =>
                updateQuantity(
                  item.productId,
                  item.variantId,
                  item.quantity - 1
                )
              }
              onIncrease={() =>
                updateQuantity(
                  item.productId,
                  item.variantId,
                  item.quantity + 1
                )
              }
              max={variant?.stock ?? 99}
            />

            <Text
              size={11}
              color="inkMuted"
            >
              {variant?.stock
                ? `${variant.stock} available`
                : 'In stock'}
            </Text>

          </View>

        </View>

      </View>
    );
  };


  /* ============================================================
     EMPTY BAG
  ============================================================ */

  if (items.length === 0) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        <View
          style={[
            styles.emptyHeader,
            {
              paddingHorizontal:
                contentPadding,
            },
          ]}
        >
          <DisplayText size={30}>
            Your Bag
          </DisplayText>
        </View>

        <OWEmptyState
          title="Your wow is waiting."
          message="Add something you love and it will show up here."
          ctaLabel="Find Your Wow"
          onCtaPress={() =>
            router.push('/(tabs)')
          }
          icon={ShoppingBag}
        />
      </View>
    );
  }


  /* ============================================================
     MAIN
  ============================================================ */

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >

      {/* ======================================================
          HEADER
      ====================================================== */}

      <View
        style={[
          styles.header,
          {
            paddingHorizontal:
              contentPadding,
          },
        ]}
      >
        <View>
          <DisplayText
            size={30}
            style={styles.headerTitle}
          >
            Your Bag
          </DisplayText>

          <Text
            size={13}
            color="inkMuted"
            style={styles.headerSubtitle}
          >
            {items.length}{' '}
            {items.length === 1
              ? 'item'
              : 'items'}{' '}
            ready for checkout
          </Text>
        </View>

        <View style={styles.bagIcon}>
          <ShoppingBag
            size={20}
            color={Colors.deepViolet}
            strokeWidth={2}
          />
        </View>
      </View>


      <View style={styles.content}>

        {/* ====================================================
            TABLET LAYOUT
        ==================================================== */}

        <FlatList
          data={items}
          keyExtractor={(item) =>
            `${item.productId}-${item.variantId}`
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}

          contentContainerStyle={{
            paddingHorizontal:
              contentPadding,

            paddingBottom:
              isTablet
                ? Spacing.xl
                : Spacing.xxxl + 100,
          }}

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

          ListHeaderComponent={() => (
            <View>

              {/* ==================================================
                  FREE DELIVERY
              ================================================== */}

              <View style={styles.deliveryCard}>

                <View style={styles.deliveryTop}>

                  <View style={styles.deliveryIcon}>
                    <Truck
                      size={18}
                      color={Colors.deepViolet}
                      strokeWidth={2}
                    />
                  </View>

                  <View style={styles.deliveryCopy}>

                    {remaining > 0 ? (
                      <>
                        <Text
                          size={13}
                          weight="semiBold"
                          color="deepViolet"
                        >
                          You're close to free delivery
                        </Text>

                        <Text
                          size={12}
                          color="inkMuted"
                          style={{ marginTop: 2 }}
                        >
                          Add{' '}
                          <Text
                            size={12}
                            weight="bold"
                            color="deepViolet"
                          >
                            {formatPrice(remaining)}
                          </Text>{' '}
                          more to unlock it.
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text
                          size={13}
                          weight="semiBold"
                          color="success"
                        >
                          Free delivery unlocked!
                        </Text>

                        <Text
                          size={12}
                          color="inkMuted"
                          style={{ marginTop: 2 }}
                        >
                          Your order qualifies for free delivery.
                        </Text>
                      </>
                    )}

                  </View>

                  <Text
                    size={11}
                    weight="bold"
                    color="deepViolet"
                  >
                    {Math.round(progress * 100)}%
                  </Text>

                </View>


                <View style={styles.progressBar}>
                  <Animated.View
                    style={[
                      styles.progressFill,
                      {
                        width: progressWidth,
                      },
                    ]}
                  />
                </View>

              </View>


              {/* ==================================================
                  ITEMS LABEL
              ================================================== */}

              <View style={styles.itemsHeading}>

                <Text
                  size={14}
                  weight="bold"
                  color="deepViolet"
                >
                  Your items
                </Text>

                <Text
                  size={12}
                  color="inkMuted"
                >
                  Swipe to refresh
                </Text>

              </View>

            </View>
          )}

          ListFooterComponent={() => (
            <View style={styles.footer}>

              {/* ==================================================
                  DELIVERY NOTE
              ================================================== */}

              <View style={styles.deliveryNote}>

                <ShieldCheck
                  size={17}
                  color={Colors.deepViolet}
                  strokeWidth={2}
                />

                <Text
                  size={11}
                  color="inkMuted"
                  style={styles.deliveryNoteText}
                >
                  Secure checkout and reliable delivery.
                </Text>

              </View>

            </View>
          )}
        />


        {/* ======================================================
            CHECKOUT SUMMARY
        ====================================================== */}

        <View
          style={[
            styles.summary,
            {
              paddingHorizontal:
                contentPadding,

              paddingBottom:
                Math.max(
                  insets.bottom + 12,
                  18
                ),
            },
          ]}
        >

          <View style={styles.summaryHandle} />


          <View style={styles.summaryRow}>
            <Text
              size={13}
              color="inkMuted"
            >
              Subtotal
            </Text>

            <Text
              size={14}
              weight="semiBold"
              color="ink"
            >
              {formatPrice(subtotal)}
            </Text>
          </View>


          <View style={styles.summaryRow}>
            <Text
              size={13}
              color="inkMuted"
            >
              Delivery
            </Text>

            <Text
              size={14}
              weight="semiBold"
              color={
                deliveryFee === 0
                  ? 'success'
                  : 'ink'
              }
            >
              {deliveryFee === 0
                ? 'FREE'
                : formatPrice(deliveryFee)}
            </Text>
          </View>


          <View style={styles.totalRow}>

            <View>
              <Text
                size={12}
                color="inkMuted"
              >
                Total
              </Text>

              <Text
                size={24}
                weight="bold"
                color="deepViolet"
              >
                {formatPrice(total)}
              </Text>
            </View>


            <Pressable
              onPress={() =>
                router.push('/checkout')
              }
              style={({ pressed }) => [
                styles.checkoutButton,
                pressed && styles.checkoutPressed,
              ]}
            >
              <Text
                style={styles.checkoutText}
              >
                Checkout
              </Text>

              <ArrowRight
                size={18}
                color={Colors.deepViolet}
                strokeWidth={2.5}
              />
            </Pressable>

          </View>

        </View>

      </View>
    </View>
  );
}


/* ================================================================
   STYLES
================================================================ */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.softWhite,
  },

  content: {
    flex: 1,
  },


  /* ============================================================
     HEADER
  ============================================================ */

  header: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  emptyHeader: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
  },

  headerTitle: {
    color: Colors.deepViolet,
    fontFamily: 'Montserrat-Bold',
  },

  headerSubtitle: {
    marginTop: 3,
  },

  bagIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor:
      'rgba(41, 33, 61, 0.06)',

    alignItems: 'center',
    justifyContent: 'center',
  },


  /* ============================================================
     DELIVERY
  ============================================================ */

  deliveryCard: {
    backgroundColor: Colors.lavenderWhite,

    borderRadius: 20,

    padding: Spacing.md,

    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },

  deliveryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  deliveryIcon: {
    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: Colors.electricLime,

    alignItems: 'center',
    justifyContent: 'center',
  },

  deliveryCopy: {
    flex: 1,
    marginLeft: Spacing.sm,
  },

  progressBar: {
    height: 7,

    borderRadius: 5,

    backgroundColor:
      'rgba(41, 33, 61, 0.10)',

    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',

    borderRadius: 5,

    backgroundColor:
      Colors.electricLime,
  },


  /* ============================================================
     ITEMS
  ============================================================ */

  itemsHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: Spacing.md,
  },

  cartItem: {
    flexDirection: 'row',

    backgroundColor: Colors.white,

    borderRadius: 20,

    padding: Spacing.sm,

    marginBottom: Spacing.md,

    borderWidth: 1,

    borderColor:
      'rgba(41, 33, 61, 0.06)',

    shadowColor: Colors.deepViolet,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.035,

    shadowRadius: 8,

    elevation: 1,
  },

  imageWrapper: {
    width: 92,
    height: 116,

    borderRadius: 14,

    overflow: 'hidden',

    backgroundColor:
      Colors.lavenderWhite,
  },

  itemImage: {
    width: '100%',
    height: '100%',
  },

  itemDetails: {
    flex: 1,

    marginLeft: Spacing.md,

    justifyContent: 'space-between',

    paddingVertical: 2,
  },

  itemTop: {
    flexDirection: 'row',
  },

  itemNameContainer: {
    flex: 1,
    paddingRight: Spacing.sm,
  },

  productName: {
    lineHeight: 20,
  },

  variantText: {
    marginTop: 4,
  },

  deleteButton: {
    width: 32,
    height: 32,

    borderRadius: 16,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor:
      'rgba(41, 33, 61, 0.04)',
  },

  price: {
    marginTop: Spacing.sm,
  },

  itemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: Spacing.sm,
  },


  /* ============================================================
     DELIVERY NOTE
  ============================================================ */

  footer: {
    paddingTop: Spacing.md,
  },

  deliveryNote: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center',

    paddingVertical: Spacing.sm,
  },

  deliveryNoteText: {
    marginLeft: 6,
  },


  /* ============================================================
     SUMMARY
  ============================================================ */

  summary: {
    backgroundColor: Colors.white,

    paddingTop: Spacing.sm,

    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,

    borderTopWidth: 1,
    borderTopColor:
      'rgba(41, 33, 61, 0.06)',

    shadowColor: Colors.deepViolet,

    shadowOffset: {
      width: 0,
      height: -5,
    },

    shadowOpacity: 0.07,

    shadowRadius: 18,

    elevation: 12,
  },

  summaryHandle: {
    width: 36,
    height: 4,

    borderRadius: 2,

    backgroundColor:
      'rgba(41, 33, 61, 0.12)',

    alignSelf: 'center',

    marginBottom: Spacing.md,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 7,
  },

  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,

    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  checkoutButton: {
    minHeight: 48,

    paddingHorizontal: 20,

    borderRadius: 24,

    backgroundColor:
      Colors.electricLime,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 8,
  },

  checkoutText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,

    color: Colors.deepViolet,
  },


  /* ============================================================
     INTERACTION
  ============================================================ */

  pressed: {
    opacity: 0.82,
  },

  checkoutPressed: {
    opacity: 0.88,
    transform: [
      {
        scale: 0.98,
      },
    ],
  },
});
