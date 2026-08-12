import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Text, DisplayText } from '@/src/components/OWText';
import { OWLogo } from '@/src/components/OWLogo';
import { Colors, Spacing, Radius } from '@/src/theme/tokens';
import { Pressable } from 'react-native';

export default function AboutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}><ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} /></Pressable>
        <Text size={17} weight="semiBold" color="deepViolet">About</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: Spacing.md, paddingBottom: Spacing.xxxl, alignItems: 'center' }}>
        <View style={styles.logoSection}>
          <OWLogo size={64} color={Colors.electricLime} />
          <DisplayText size={32} style={{ marginTop: Spacing.md }}>openwow</DisplayText>
          <Text size={14} color="inkMuted" style={{ marginTop: 4 }}>Version 1.0.0</Text>
        </View>

        <Text size={15} color="inkLight" align="center" style={{ marginTop: Spacing.lg, lineHeight: 22, maxWidth: 320 }}>
          openwow is a Ghana-based handbag brand creating pieces worth carrying. From everyday essentials to statement showstoppers, every bag is designed with intention and made to last.
        </Text>

        <View style={styles.valuesCard}>
          <Text size={13} weight="semiBold" color="electricViolet" style={{ letterSpacing: 1, marginBottom: Spacing.md }}>OUR VALUES</Text>
          <ValueItem title="Crafted with care" description="Every piece is made with attention to detail and quality materials." />
          <ValueItem title="Designed for you" description="Bags that fit your life, your style, and your story." />
          <ValueItem title="Made in Ghana" description="Proudly local. Proudly African. Proudly wow." />
        </View>

        <Text size={13} color="inkMuted" style={{ marginTop: Spacing.xl }}>© 2025 openwow. All rights reserved.</Text>
      </ScrollView>
    </View>
  );
}

function ValueItem({ title, description }: { title: string; description: string }) {
  return (
    <View style={{ marginBottom: Spacing.md }}>
      <Text size={15} weight="semiBold" color="ink">{title}</Text>
      <Text size={14} color="inkLight" style={{ marginTop: 2 }}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  navBar: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  logoSection: { alignItems: 'center', marginTop: Spacing.xl },
  valuesCard: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, padding: Spacing.lg, marginTop: Spacing.xl, width: '100%' },
});
