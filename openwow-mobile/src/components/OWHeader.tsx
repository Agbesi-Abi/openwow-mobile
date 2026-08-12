import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, ShoppingBag } from 'lucide-react-native';
import { Colors, Spacing } from '@/src/theme/tokens';
import { Text } from './OWText';
import { useCart } from '@/src/state/CartContext';

export function OWHeader() {
  const router = useRouter();
  const { itemCount } = useCart();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push('/(tabs)')} style={styles.logo}>
        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 22, color: Colors.deepViolet, letterSpacing: -0.5 }}>openwow</Text>
      </Pressable>
      <View style={styles.actions}>
        <Pressable onPress={() => router.push('/search')} style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.6 }]} accessibilityLabel="Search">
          <Search size={22} color={Colors.deepViolet} strokeWidth={2} />
        </Pressable>
        <Pressable onPress={() => router.push('/(tabs)/bag')} style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.6 }]} accessibilityLabel="Shopping bag">
          <ShoppingBag size={22} color={Colors.deepViolet} strokeWidth={2} />
          {itemCount > 0 && (
            <View style={styles.badge}>
              <Text size={10} weight="bold" color="white">{itemCount}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, height: 52, backgroundColor: Colors.softWhite },
  logo: {},
  actions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  iconButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  badge: { position: 'absolute', top: 4, right: 4, minWidth: 18, height: 18, paddingHorizontal: 5, borderRadius: 9, backgroundColor: Colors.electricLime, alignItems: 'center', justifyContent: 'center' },
});
