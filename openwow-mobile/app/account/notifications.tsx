import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Package, CreditCard, Truck, Heart, Sparkles, Tag } from 'lucide-react-native';
import { Text } from '@/src/components/OWText';
import { Colors, Spacing, Radius } from '@/src/theme/tokens';
import type { AppNotification } from '@/src/types';

const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', type: 'order', title: 'Order Out for Delivery', body: 'Your Nova bag is on its way! Expected delivery: Aug 11', read: false, createdAt: '2025-08-10T08:00:00Z' },
  { id: 'n2', type: 'promo', title: 'Weekend Sale', body: 'Up to 20% off selected statement pieces. Shop now!', read: false, createdAt: '2025-08-09T10:00:00Z' },
  { id: 'n3', type: 'collection', title: 'New Collection', body: 'The Mini Edit just dropped. See what is new.', read: true, createdAt: '2025-08-07T14:00:00Z' },
  { id: 'n4', type: 'delivery', title: 'Order Delivered', body: 'Your Luna tote has been delivered. Enjoy!', read: true, createdAt: '2025-07-31T12:00:00Z' },
];

const iconMap = { order: Package, payment: CreditCard, delivery: Truck, wishlist: Heart, collection: Sparkles, promo: Tag };
const colorMap = { order: Colors.deepViolet, payment: Colors.electricViolet, delivery: Colors.success, wishlist: Colors.error, collection: Colors.electricViolet, promo: Colors.warning };

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}><ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} /></Pressable>
        <Text size={17} weight="semiBold" color="deepViolet">Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: Spacing.md, paddingBottom: Spacing.xxxl }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const Icon = iconMap[item.type];
          const color = colorMap[item.type];
          return (
            <Pressable style={({ pressed }) => [styles.notifCard, pressed && { opacity: 0.9 }, !item.read && styles.notifUnread]}>
              <View style={[styles.notifIcon, { backgroundColor: color + '20' }]}><Icon size={20} color={color} strokeWidth={2} /></View>
              <View style={{ flex: 1 }}>
                <View style={styles.notifHeader}>
                  <Text size={15} weight="semiBold" color="ink">{item.title}</Text>
                  {!item.read && <View style={styles.unreadDot} />}
                </View>
                <Text size={14} color="inkLight" style={{ marginTop: 2 }}>{item.body}</Text>
                <Text size={12} color="inkMuted" style={{ marginTop: 4 }}>{new Date(item.createdAt).toLocaleDateString('en-GH', { day: 'numeric', month: 'short' })}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  navBar: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  notifCard: { flexDirection: 'row', gap: Spacing.md, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm },
  notifUnread: { borderColor: Colors.electricViolet, backgroundColor: Colors.lavenderWhite },
  notifIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  notifHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.electricViolet },
});
