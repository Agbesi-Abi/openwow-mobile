import { View, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/src/theme/tokens';
import { Text } from './OWText';
import { OWButton } from './OWButton';
import type { LucideIcon } from 'lucide-react-native';

interface OWEmptyStateProps {
  title: string;
  message?: string;
  ctaLabel?: string;
  onCtaPress?: () => void;
  icon?: LucideIcon;
}

export function OWEmptyState({ title, message, ctaLabel, onCtaPress, icon: Icon }: OWEmptyStateProps) {
  return (
    <View style={styles.container}>
      {Icon && <View style={styles.iconContainer}><Icon size={48} color={Colors.inkMuted} strokeWidth={1.5} /></View>}
      <Text style={{ ...Typography.heading2, fontFamily: 'Montserrat-Bold', color: Colors.deepViolet, textAlign: 'center' }}>{title}</Text>
      {message && <Text size={15} color="inkMuted" align="center" style={styles.message}>{message}</Text>}
      {ctaLabel && onCtaPress && <OWButton label={ctaLabel} onPress={onCtaPress} variant="primary" style={styles.cta} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.xxxl },
  iconContainer: { width: 88, height: 88, borderRadius: 44, backgroundColor: Colors.lavenderWhite, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg },
  message: { marginTop: Spacing.sm, marginBottom: Spacing.xl, maxWidth: 280 },
  cta: { minWidth: 200 },
});
