import { View, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Mail, Phone, MessageCircle, ExternalLink } from 'lucide-react-native';
import { Text } from '@/src/components/OWText';
import { Colors, Spacing, Radius } from '@/src/theme/tokens';

const FAQS = [
  { q: 'How long does delivery take?', a: 'Delivery within Greater Accra takes 1-2 business days. Other regions take 2-5 business days.' },
  { q: 'What is your return policy?', a: 'We offer 7-day returns on unused items in their original packaging. Sale items are non-returnable.' },
  { q: 'Which payment methods do you accept?', a: 'We accept Mobile Money (MTN, Vodafone, AirtelTigo) and card payments (Visa, Mastercard).' },
  { q: 'Can I track my order?', a: 'Yes! Go to My Orders, tap on your order, and you will see real-time tracking updates.' },
  { q: 'Are your bags genuine leather?', a: 'Some bags are genuine leather and others are premium vegan leather. Check the product details for material info.' },
];

export default function HelpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}><ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} /></Pressable>
        <Text size={17} weight="semiBold" color="deepViolet">Help Center</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: Spacing.md, paddingBottom: Spacing.xxxl }}>
        <Text size={13} weight="semiBold" color="inkMuted" style={{ letterSpacing: 1, marginTop: Spacing.md, marginBottom: Spacing.sm }}>CONTACT US</Text>
        <View style={styles.group}>
          <Pressable onPress={() => Linking.openURL('mailto:hello@openwow.com')} style={({ pressed }) => [styles.row, pressed && { backgroundColor: Colors.lavenderWhite }]}>
            <View style={styles.rowIcon}><Mail size={20} color={Colors.deepViolet} strokeWidth={2} /></View>
            <View style={{ flex: 1 }}><Text size={15} weight="medium" color="ink">Email</Text><Text size={13} color="inkMuted">hello@openwow.com</Text></View>
            <ExternalLink size={16} color={Colors.inkMuted} strokeWidth={2} />
          </Pressable>
          <Pressable onPress={() => Linking.openURL('tel:+233123456789')} style={({ pressed }) => [styles.row, pressed && { backgroundColor: Colors.lavenderWhite }]}>
            <View style={styles.rowIcon}><Phone size={20} color={Colors.deepViolet} strokeWidth={2} /></View>
            <View style={{ flex: 1 }}><Text size={15} weight="medium" color="ink">Phone</Text><Text size={13} color="inkMuted">+233 123 456 789</Text></View>
            <ExternalLink size={16} color={Colors.inkMuted} strokeWidth={2} />
          </Pressable>
          <Pressable onPress={() => Linking.openURL('https://wa.me/233123456789')} style={({ pressed }) => [styles.row, pressed && { backgroundColor: Colors.lavenderWhite }]}>
            <View style={styles.rowIcon}><MessageCircle size={20} color={Colors.deepViolet} strokeWidth={2} /></View>
            <View style={{ flex: 1 }}><Text size={15} weight="medium" color="ink">WhatsApp</Text><Text size={13} color="inkMuted">Chat with us</Text></View>
            <ExternalLink size={16} color={Colors.inkMuted} strokeWidth={2} />
          </Pressable>
        </View>

        <Text size={13} weight="semiBold" color="inkMuted" style={{ letterSpacing: 1, marginTop: Spacing.lg, marginBottom: Spacing.sm }}>FAQ</Text>
        {FAQS.map((faq, i) => (
          <View key={i} style={styles.faqCard}>
            <Text size={15} weight="semiBold" color="ink">{faq.q}</Text>
            <Text size={14} color="inkLight" style={{ marginTop: 4, lineHeight: 20 }}>{faq.a}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  navBar: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  group: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md + 2, paddingHorizontal: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border },
  rowIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.lavenderWhite, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  faqCard: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm },
});
