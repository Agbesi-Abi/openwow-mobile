import { View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Check, Package, Truck, Home, Clock } from 'lucide-react-native';
import { Text, DisplayText } from '@/src/components/OWText';
import { OWButton } from '@/src/components/OWButton';
import { Colors, Spacing, Typography, formatPrice } from '@/src/theme/tokens';
import type { Order, OrderStatus } from '@/src/types';

const MOCK_ORDER: Order = {
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
};

const stepIcons = [Package, Check, Check, Truck, Home];

export default function OrderDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const order = MOCK_ORDER;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}><ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} /></Pressable>
        <Text size={17} weight="semiBold" color="deepViolet">Order Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Spacing.xxxl, paddingHorizontal: Spacing.md }}>
        {/* Order Header */}
        <View style={styles.headerCard}>
          <Text size={13} color="inkMuted">Order {order.orderNumber}</Text>
          <Text size={15} weight="bold" color="ink" style={{ marginTop: 2 }}>{formatPrice(order.total)}</Text>
          <Text size={13} color="inkMuted" style={{ marginTop: 2 }}>Placed on {new Date(order.createdAt).toLocaleDateString('en-GH', { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
        </View>

        {/* Tracking */}
        <View style={styles.trackingCard}>
          <Text size={15} weight="semiBold" color="ink" style={{ marginBottom: Spacing.lg }}>Order Tracking</Text>
          {order.trackingHistory.map((event, i) => {
            const Icon = stepIcons[i] ?? Check;
            const isLast = i === order.trackingHistory.length - 1;
            return (
              <View key={i} style={styles.trackingItem}>
                <View style={styles.trackingIconCol}>
                  <View style={[styles.trackingIcon, event.completed && styles.trackingIconCompleted]}>
                    <Icon size={16} color={event.completed ? Colors.deepViolet : Colors.inkMuted} strokeWidth={2.5} />
                  </View>
                  {!isLast && <View style={[styles.trackingLine, event.completed && styles.trackingLineCompleted]} />}
                </View>
                <View style={{ flex: 1, paddingBottom: Spacing.lg }}>
                  <Text size={15} weight="semiBold" color={event.completed ? 'ink' : 'inkMuted'}>{event.label}</Text>
                  <Text size={13} color="inkMuted" style={{ marginTop: 2 }}>{event.description}</Text>
                  {event.timestamp && <Text size={12} color="inkMuted" style={{ marginTop: 2 }}>{new Date(event.timestamp).toLocaleString('en-GH', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</Text>}
                </View>
              </View>
            );
          })}
        </View>

        {/* Items */}
        <View style={styles.itemsCard}>
          <Text size={15} weight="semiBold" color="ink" style={{ marginBottom: Spacing.md }}>Items</Text>
          {order.items.map((item, i) => (
            <View key={i} style={styles.itemRow}>
              <Image source={{ uri: item.productImage }} style={styles.itemImage} resizeMode="cover" />
              <View style={{ flex: 1 }}>
                <Text size={15} weight="semiBold" color="ink">{item.productName}</Text>
                <Text size={13} color="inkMuted">{item.color} · Qty {item.quantity}</Text>
                <Text size={14} weight="semiBold" color="ink" style={{ marginTop: 2 }}>{formatPrice(item.unitPrice * item.quantity)}</Text>
              </View>
            </View>
          ))}
          <View style={styles.summarySection}>
            <View style={styles.summaryRow}><Text size={14} color="inkLight">Subtotal</Text><Text size={14} weight="semiBold" color="ink">{formatPrice(order.subtotal)}</Text></View>
            <View style={styles.summaryRow}><Text size={14} color="inkLight">Delivery</Text><Text size={14} weight="semiBold" color="ink">{formatPrice(order.deliveryFee)}</Text></View>
            <View style={[styles.summaryRow, { marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border }]}>
              <Text size={16} weight="bold" color="deepViolet">Total</Text>
              <Text size={16} weight="bold" color="deepViolet">{formatPrice(order.total)}</Text>
            </View>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.addressCard}>
          <Text size={15} weight="semiBold" color="ink" style={{ marginBottom: Spacing.sm }}>Delivery Address</Text>
          <Text size={14} weight="semiBold" color="ink">{order.address.name}</Text>
          <Text size={14} color="inkLight">{order.address.phone}</Text>
          <Text size={14} color="inkLight" style={{ marginTop: 2 }}>{order.address.address}</Text>
          <Text size={14} color="inkLight">{order.address.area}, {order.address.city}</Text>
          <Text size={14} color="inkLight">{order.address.region}</Text>
        </View>

        {/* Payment */}
        <View style={styles.addressCard}>
          <Text size={15} weight="semiBold" color="ink" style={{ marginBottom: Spacing.sm }}>Payment</Text>
          <View style={styles.summaryRow}>
            <Text size={14} color="inkLight">Method</Text>
            <Text size={14} weight="semiBold" color="ink">{order.paymentMethod}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text size={14} color="inkLight">Status</Text>
            <Text size={14} weight="semiBold" color="success">Paid</Text>
          </View>
        </View>

        <OWButton label="Continue Shopping" onPress={() => router.replace('/(tabs)')} fullWidth size="lg" style={{ marginTop: Spacing.lg }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  navBar: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerCard: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, padding: Spacing.md, marginBottom: Spacing.md },
  trackingCard: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, padding: Spacing.md, marginBottom: Spacing.md },
  trackingItem: { flexDirection: 'row' },
  trackingIconCol: { alignItems: 'center', marginRight: Spacing.md },
  trackingIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.lavenderWhite, alignItems: 'center', justifyContent: 'center' },
  trackingIconCompleted: { backgroundColor: Colors.electricLime },
  trackingLine: { width: 2, flex: 1, backgroundColor: Colors.border, marginTop: 4, minHeight: 24 },
  trackingLineCompleted: { backgroundColor: Colors.electricLime },
  itemsCard: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, padding: Spacing.md, marginBottom: Spacing.md },
  itemRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
  itemImage: { width: 64, height: 80, borderRadius: 8, backgroundColor: Colors.lavenderWhite },
  summarySection: { marginTop: Spacing.sm, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.border },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  addressCard: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, padding: Spacing.md, marginBottom: Spacing.md },
});
