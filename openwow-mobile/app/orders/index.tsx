import { View, StyleSheet, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Package } from 'lucide-react-native';
import { Text, DisplayText } from '@/src/components/OWText';
import { OWEmptyState } from '@/src/components/OWEmptyState';
import { OWBadge } from '@/src/components/OWBadge';
import { Colors, Spacing, Typography, formatPrice } from '@/src/theme/tokens';
import type { Order, OrderStatus } from '@/src/types';

const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'OW-2025-0042',
    items: [
      { productId: 'p-nova', productName: 'Nova', productImage: 'https://images.pexels.com/photos/11031129/pexels-photo-11031129.png?auto=compress&cs=tinysrgb&h=650&w=940', variantId: 'v-nova-blk', color: 'Black', quantity: 1, unitPrice: 250 },
    ],
    subtotal: 250, deliveryFee: 20, total: 270,
    status: 'out_for_delivery', paymentStatus: 'paid', paymentMethod: 'Mobile Money',
    address: { id: 'addr-1', label: 'Home', name: 'Ama Mensah', phone: '024 123 4567', region: 'Greater Accra', city: 'Accra', area: 'East Legon', address: 'House 12, Street Name', isDefault: true },
    createdAt: '2025-08-08T10:00:00Z',
    estimatedDelivery: '2025-08-11',
    trackingHistory: [
      { status: 'placed', label: 'Order Placed', description: 'Your order has been placed', timestamp: '2025-08-08T10:00:00Z', completed: true },
      { status: 'paid', label: 'Payment Confirmed', description: 'Payment received via Mobile Money', timestamp: '2025-08-08T10:05:00Z', completed: true },
      { status: 'processing', label: 'Processing', description: 'Your order is being prepared', timestamp: '2025-08-09T09:00:00Z', completed: true },
      { status: 'out_for_delivery', label: 'Out for Delivery', description: 'Your order is on its way', timestamp: '2025-08-10T08:00:00Z', completed: true },
      { status: 'delivered', label: 'Delivered', description: 'Your order has been delivered', timestamp: '', completed: false },
    ],
  },
  {
    id: 'ord-2',
    orderNumber: 'OW-2025-0038',
    items: [
      { productId: 'p-luna', productName: 'Luna', productImage: 'https://images.pexels.com/photos/36365228/pexels-photo-36365228.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', variantId: 'v-luna-ivory', color: 'Ivory', quantity: 1, unitPrice: 320 },
      { productId: 'p-ava', productName: 'Ava', productImage: 'https://images.pexels.com/photos/33074938/pexels-photo-33074938.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', variantId: 'v-ava-sage', color: 'Sage', quantity: 1, unitPrice: 190 },
    ],
    subtotal: 510, deliveryFee: 20, total: 530,
    status: 'delivered', paymentStatus: 'paid', paymentMethod: 'Card',
    address: { id: 'addr-1', label: 'Home', name: 'Ama Mensah', phone: '024 123 4567', region: 'Greater Accra', city: 'Accra', area: 'East Legon', address: 'House 12, Street Name', isDefault: true },
    createdAt: '2025-07-28T14:00:00Z',
    estimatedDelivery: '2025-07-31',
    trackingHistory: [
      { status: 'placed', label: 'Order Placed', description: 'Your order has been placed', timestamp: '2025-07-28T14:00:00Z', completed: true },
      { status: 'delivered', label: 'Delivered', description: 'Your order has been delivered', timestamp: '2025-07-31T12:00:00Z', completed: true },
    ],
  },
];

const statusColors: Record<OrderStatus, string> = {
  placed: Colors.inkMuted,
  paid: Colors.electricViolet,
  processing: Colors.warning,
  out_for_delivery: Colors.electricViolet,
  delivered: Colors.success,
  cancelled: Colors.error,
};

const statusLabels: Record<OrderStatus, string> = {
  placed: 'Placed',
  paid: 'Paid',
  processing: 'Processing',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export default function OrdersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}><ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} /></Pressable>
        <Text size={17} weight="semiBold" color="deepViolet">My Orders</Text>
        <View style={{ width: 40 }} />
      </View>

      {MOCK_ORDERS.length === 0 ? (
        <OWEmptyState title="No orders yet." message="When you place an order, it will show up here." ctaLabel="Start Shopping" onCtaPress={() => router.push('/(tabs)')} icon={Package} />
      ) : (
        <FlatList
          data={MOCK_ORDERS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: Spacing.md, paddingBottom: Spacing.xxxl }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/orders/${item.id}`)} style={({ pressed }) => [styles.orderCard, pressed && { opacity: 0.9 }]}>
              <View style={styles.orderHeader}>
                <View>
                  <Text size={13} color="inkMuted">Order {item.orderNumber}</Text>
                  <Text size={15} weight="bold" color="ink" style={{ marginTop: 2 }}>{formatPrice(item.total)}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColors[item.status] + '20' }]}>
                  <Text size={12} weight="semiBold" color={statusColors[item.status]}>{statusLabels[item.status]}</Text>
                </View>
              </View>
              <View style={styles.orderItems}>
                {item.items.map((oi, i) => (
                  <View key={i} style={styles.orderItemRow}>
                    <View style={styles.orderItemImage} />
                    <View style={{ flex: 1 }}>
                      <Text size={14} weight="semiBold" color="ink">{oi.productName}</Text>
                      <Text size={13} color="inkMuted">{oi.color} · Qty {oi.quantity}</Text>
                    </View>
                    <Text size={14} weight="semiBold" color="ink">{formatPrice(oi.unitPrice * oi.quantity)}</Text>
                  </View>
                ))}
              </View>
              <Text size={13} color="inkMuted" style={{ marginTop: Spacing.sm }}>Placed on {new Date(item.createdAt).toLocaleDateString('en-GH', { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  navBar: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  orderCard: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, padding: Spacing.md, marginBottom: Spacing.md },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  statusBadge: { paddingHorizontal: Spacing.sm + 2, paddingVertical: Spacing.xs + 1, borderRadius: 6 },
  orderItems: { marginTop: Spacing.md, gap: Spacing.sm },
  orderItemRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  orderItemImage: { width: 48, height: 48, borderRadius: 8, backgroundColor: Colors.lavenderWhite },
});
