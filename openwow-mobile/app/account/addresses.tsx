import { View, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Plus, MapPin, Edit3, Trash2, Check } from 'lucide-react-native';
import { Text, DisplayText } from '@/src/components/OWText';
import { OWButton } from '@/src/components/OWButton';
import { OWEmptyState } from '@/src/components/OWEmptyState';
import { Colors, Spacing, Radius } from '@/src/theme/tokens';
import type { Address } from '@/src/types';

const MOCK_ADDRESSES: Address[] = [
  { id: 'addr-1', label: 'Home', name: 'Ama Mensah', phone: '024 123 4567', region: 'Greater Accra', city: 'Accra', area: 'East Legon', address: 'House 12, Street Name', isDefault: true },
  { id: 'addr-2', label: 'Work', name: 'Ama Mensah', phone: '024 123 4567', region: 'Greater Accra', city: 'Accra', area: 'Osu', address: 'Office 5, Oxford Street', isDefault: false },
];

export default function AddressesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}><ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} /></Pressable>
        <Text size={17} weight="semiBold" color="deepViolet">Addresses</Text>
        <View style={{ width: 40 }} />
      </View>

      {MOCK_ADDRESSES.length === 0 ? (
        <OWEmptyState title="No addresses saved." message="Add a delivery address to speed up checkout." ctaLabel="Add Address" onCtaPress={() => {}} icon={MapPin} />
      ) : (
        <FlatList
          data={MOCK_ADDRESSES}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: Spacing.md, paddingBottom: Spacing.xxxl }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <Text size={14} color="inkMuted" style={{ marginBottom: Spacing.md }}>Saved delivery addresses</Text>}
          renderItem={({ item }) => (
            <View style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <View style={styles.labelBadge}><Text size={12} weight="semiBold" color="deepViolet">{item.label}</Text></View>
                {item.isDefault && <View style={styles.defaultBadge}><Check size={12} color={Colors.deepViolet} strokeWidth={3} /><Text size={12} weight="semiBold" color="deepViolet">Default</Text></View>}
              </View>
              <Text size={15} weight="semiBold" color="ink" style={{ marginTop: Spacing.sm }}>{item.name}</Text>
              <Text size={14} color="inkLight">{item.phone}</Text>
              <Text size={14} color="inkLight" style={{ marginTop: 2 }}>{item.address}, {item.area}</Text>
              <Text size={14} color="inkLight">{item.city}, {item.region}</Text>
              <View style={styles.addressActions}>
                <Pressable style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}><Edit3 size={16} color={Colors.deepViolet} strokeWidth={2} /><Text size={13} weight="semiBold" color="deepViolet" style={{ marginLeft: 6 }}>Edit</Text></Pressable>
                <Pressable style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}><Trash2 size={16} color={Colors.error} strokeWidth={2} /><Text size={13} weight="semiBold" color="error" style={{ marginLeft: 6 }}>Delete</Text></Pressable>
              </View>
            </View>
          )}
        />
      )}

      <View style={{ paddingHorizontal: Spacing.md, paddingBottom: insets.bottom || Spacing.lg }}>
        <OWButton label="Add New Address" onPress={() => {}} variant="outline" fullWidth size="lg" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  navBar: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  addressCard: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.md },
  addressHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  labelBadge: { paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: 6, backgroundColor: Colors.lavenderWhite },
  defaultBadge: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: 6, backgroundColor: Colors.electricLime },
  addressActions: { flexDirection: 'row', gap: Spacing.lg, marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.border },
  actionBtn: { flexDirection: 'row', alignItems: 'center' },
});
