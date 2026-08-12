import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, DisplayText } from '@/src/components/OWText';
import { ChevronRight, Package, Heart, MapPin, Bell, Settings, HelpCircle, Info, LogOut, User } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '@/src/theme/tokens';
import { useResponsive } from '@/src/hooks/useResponsive';
import { useAuth } from '@/src/state/AuthContext';
import type { LucideIcon } from 'lucide-react-native';

export default function AccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const { contentPadding } = useResponsive();

  const menuItems: { label: string; icon: LucideIcon; onPress: () => void }[] = [
    { label: 'My Orders', icon: Package, onPress: () => router.push('/orders') },
    { label: 'Wishlist', icon: Heart, onPress: () => router.push('/(tabs)/wishlist') },
    { label: 'Addresses', icon: MapPin, onPress: () => router.push('/account/addresses') },
    { label: 'Profile', icon: User, onPress: () => router.push('/account/profile') },
    { label: 'Notifications', icon: Bell, onPress: () => router.push('/account/notifications') },
    { label: 'Settings', icon: Settings, onPress: () => router.push('/account/settings') },
    { label: 'Help', icon: HelpCircle, onPress: () => router.push('/account/help') },
    { label: 'About openwow', icon: Info, onPress: () => router.push('/account/about') },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Spacing.xxxl }}>
        <View style={[styles.header, { paddingHorizontal: contentPadding }]}>
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user ? user.name.charAt(0).toUpperCase() : '?'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <DisplayText size={28}>{user ? `Hi, ${user.name}` : 'Account'}</DisplayText>
              <Text size={14} color="inkMuted" style={{ marginTop: 4 }}>{user?.email ?? 'Sign in to sync your wow'}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.menuGroup, { marginHorizontal: contentPadding }]}>
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Pressable key={i} onPress={item.onPress} style={({ pressed }) => [styles.menuItem, pressed && { backgroundColor: Colors.lavenderWhite }]}>
                <View style={styles.menuIcon}><Icon size={20} color={Colors.deepViolet} strokeWidth={2} /></View>
                <Text size={15} weight="medium" color="ink" style={{ flex: 1 }}>{item.label}</Text>
                <ChevronRight size={20} color={Colors.inkMuted} strokeWidth={2} />
              </Pressable>
            );
          })}
        </View>

        <Pressable onPress={() => { signOut(); router.push('/(tabs)'); }} style={({ pressed }) => [styles.logoutBtn, { marginHorizontal: contentPadding }, pressed && { opacity: 0.7 }]}>
          <LogOut size={20} color={Colors.error} strokeWidth={2} />
          <Text size={15} weight="semiBold" color="error">Logout</Text>
        </Pressable>

        <Text size={12} color="inkMuted" align="center" style={{ marginTop: Spacing.xl }}>openwow v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  header: { paddingVertical: Spacing.lg },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.deepViolet, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Montserrat-Bold', fontSize: 24, color: Colors.electricLime },
  menuGroup: { backgroundColor: Colors.white, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: Colors.border },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md + 2, paddingHorizontal: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border },
  menuIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.lavenderWhite, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, marginTop: Spacing.xl, paddingVertical: Spacing.md, borderRadius: 12, borderWidth: 1.5, borderColor: Colors.error },
});
