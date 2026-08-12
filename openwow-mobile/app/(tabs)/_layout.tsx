import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react-native';
import { Colors } from '@/src/theme/tokens';
import { useWishlist } from '@/src/state/WishlistContext';
import { useCart } from '@/src/state/CartContext';

function ActiveDot() {
  const pulse = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.5, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);
  return <Animated.View style={[styles.activeDot, { opacity: pulse, transform: [{ scale: pulse.interpolate({ inputRange: [0.5, 1], outputRange: [0.8, 1.2] }) }] }]} />;
}

function Badge({ count }: { count: number }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { count: wishlistCount } = useWishlist();
  const { itemCount: cartCount } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.deepViolet,
        tabBarInactiveTintColor: Colors.inkMuted,
        tabBarLabelStyle: { fontFamily: 'Inter-SemiBold', fontSize: 11, letterSpacing: 0.3, marginTop: 2 },
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          minHeight: 64,
          paddingBottom: Math.max(10, insets.bottom + 10),
          paddingTop: 8,
          paddingHorizontal: 8,
        },
        tabBarIconStyle: { marginTop: 0 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconContainer}>
              <Home color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
              {focused && <ActiveDot />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconContainer}>
              <Compass color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
              {focused && <ActiveDot />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconContainer}>
              <Heart color={color} size={size} strokeWidth={focused ? 2.5 : 2} fill={focused ? color : 'transparent'} />
              {wishlistCount > 0 && <Badge count={wishlistCount} />}
              {focused && <ActiveDot />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          title: 'Bag',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconContainer}>
              <ShoppingBag color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
              {cartCount > 0 && <Badge count={cartCount} />}
              {focused && <ActiveDot />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconContainer}>
              <User color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
              {focused && <ActiveDot />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: { alignItems: 'center', justifyContent: 'center' },
  activeDot: {
    position: 'absolute',
    bottom: -6,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.electricLime,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: Colors.electricLime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontFamily: 'Inter-Bold', fontSize: 10, color: Colors.deepViolet },
});
