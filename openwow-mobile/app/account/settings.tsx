import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Bell, Moon, Globe, Lock, HelpCircle } from 'lucide-react-native';
import { Text } from '@/src/components/OWText';
import { Colors, Spacing, Radius } from '@/src/theme/tokens';
import { useState } from 'react';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}><ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} /></Pressable>
        <Text size={17} weight="semiBold" color="deepViolet">Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: Spacing.md, paddingBottom: Spacing.xxxl }}>
        <Text size={13} weight="semiBold" color="inkMuted" style={{ letterSpacing: 1, marginTop: Spacing.md, marginBottom: Spacing.sm }}>PREFERENCES</Text>
        <View style={styles.group}>
          <ToggleRow icon={Bell} label="Push Notifications" value={pushEnabled} onToggle={() => setPushEnabled(!pushEnabled)} />
          <ToggleRow icon={Moon} label="Dark Mode" value={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        </View>

        <Text size={13} weight="semiBold" color="inkMuted" style={{ letterSpacing: 1, marginTop: Spacing.lg, marginBottom: Spacing.sm }}>ACCOUNT</Text>
        <View style={styles.group}>
          <NavRow icon={Lock} label="Privacy & Security" onPress={() => {}} />
          <NavRow icon={Globe} label="Language" value="English" onPress={() => {}} />
          <NavRow icon={HelpCircle} label="Help Center" onPress={() => router.push('/account/help')} />
        </View>

        <Text size={13} color="inkMuted" style={{ marginTop: Spacing.xl, textAlign: 'center' }}>openwow v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

function ToggleRow({ icon: Icon, label, value, onToggle }: { icon: any; label: string; value: boolean; onToggle: () => void }) {
  return (
    <Pressable onPress={onToggle} style={({ pressed }) => [styles.row, pressed && { backgroundColor: Colors.lavenderWhite }]}>
      <View style={styles.rowIcon}><Icon size={20} color={Colors.deepViolet} strokeWidth={2} /></View>
      <Text size={15} color="ink" style={{ flex: 1 }}>{label}</Text>
      <View style={[styles.toggle, value && styles.toggleOn]}><View style={[styles.toggleKnob, value && styles.toggleKnobOn]} /></View>
    </Pressable>
  );
}

function NavRow({ icon: Icon, label, value, onPress }: { icon: any; label: string; value?: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { backgroundColor: Colors.lavenderWhite }]}>
      <View style={styles.rowIcon}><Icon size={20} color={Colors.deepViolet} strokeWidth={2} /></View>
      <Text size={15} color="ink" style={{ flex: 1 }}>{label}</Text>
      {value && <Text size={14} color="inkMuted" style={{ marginRight: Spacing.sm }}>{value}</Text>}
      <ChevronLeft size={18} color={Colors.inkMuted} strokeWidth={2} style={{ transform: [{ rotate: '180deg' }] }} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  navBar: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  group: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md + 2, paddingHorizontal: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border },
  rowIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.lavenderWhite, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  toggle: { width: 44, height: 26, borderRadius: 13, backgroundColor: Colors.border, padding: 2, justifyContent: 'center' },
  toggleOn: { backgroundColor: Colors.electricLime },
  toggleKnob: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.white, alignSelf: 'flex-start' },
  toggleKnobOn: { alignSelf: 'flex-end' },
});
