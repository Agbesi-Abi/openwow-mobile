import { View, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Camera } from 'lucide-react-native';
import { Text, DisplayText } from '@/src/components/OWText';
import { OWButton } from '@/src/components/OWButton';
import { Colors, Spacing, Radius } from '@/src/theme/tokens';
import { useAuth } from '@/src/state/AuthContext';
import { useToast } from '@/src/state/ToastContext';
import { useState } from 'react';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({ name, phone });
    setSaving(false);
    showToast('Profile updated', 'success');
    router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}><ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} /></Pressable>
        <Text size={17} weight="semiBold" color="deepViolet">Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: Spacing.md, paddingBottom: Spacing.xxxl }}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 32, color: Colors.deepViolet }}>{(name || 'U').charAt(0).toUpperCase()}</Text>
            <View style={styles.cameraBtn}><Camera size={16} color={Colors.white} strokeWidth={2} /></View>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text size={13} weight="semiBold" color="ink" style={{ marginBottom: 6 }}>Full Name</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Your name" placeholderTextColor={Colors.inkMuted} />
        </View>

        <View style={styles.formGroup}>
          <Text size={13} weight="semiBold" color="ink" style={{ marginBottom: 6 }}>Email</Text>
          <TextInput value={user?.email ?? ''} editable={false} style={[styles.input, { color: Colors.inkMuted }]} />
        </View>

        <View style={styles.formGroup}>
          <Text size={13} weight="semiBold" color="ink" style={{ marginBottom: 6 }}>Phone Number</Text>
          <TextInput value={phone} onChangeText={setPhone} style={styles.input} placeholder="024 123 4567" placeholderTextColor={Colors.inkMuted} keyboardType="phone-pad" />
        </View>

        <OWButton label="Save Changes" onPress={handleSave} loading={saving} fullWidth size="lg" style={{ marginTop: Spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  navBar: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarSection: { alignItems: 'center', paddingVertical: Spacing.xl },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: Colors.lavenderWhite, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.deepViolet, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: Colors.softWhite },
  formGroup: { marginBottom: Spacing.md },
  input: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, paddingHorizontal: Spacing.md, paddingVertical: Spacing.md - 2, fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.ink },
});
