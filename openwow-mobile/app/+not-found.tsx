import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Compass } from 'lucide-react-native';
import { DisplayText, Text } from '@/src/components/OWText';
import { OWButton } from '@/src/components/OWButton';
import { Colors, Spacing } from '@/src/theme/tokens';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Compass size={56} color={Colors.electricLime} strokeWidth={1.5} />
      </View>
      <DisplayText size={32} align="center">Lost in the wow.</DisplayText>
      <Text size={15} color="inkMuted" align="center" style={styles.message}>
        The page you are looking for doesn't exist or has been moved.
      </Text>
      <OWButton label="Back to Home" onPress={() => router.replace('/(tabs)')} variant="primary" size="lg" style={styles.cta} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl, backgroundColor: Colors.softWhite },
  iconContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.lavenderWhite, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg },
  message: { marginTop: Spacing.sm, marginBottom: Spacing.xl, maxWidth: 280 },
  cta: { minWidth: 220 },
});
