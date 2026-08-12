import { View, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '@/src/theme/tokens';
import { Text } from './OWText';

type BadgeVariant = 'new' | 'sale' | 'soldout' | 'default' | 'lime';

interface OWBadgeProps { label: string; variant?: BadgeVariant; }

export function OWBadge({ label, variant = 'default' }: OWBadgeProps) {
  const v = variantStyles[variant];
  return (
    <View style={[styles.container, v.container]}>
      <Text style={{ ...Typography.label, color: v.color }}>{label.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: Spacing.sm + 2, paddingVertical: Spacing.xs + 1, borderRadius: Radius.sm, alignSelf: 'flex-start' },
});

const variantStyles = {
  new: { container: { backgroundColor: Colors.electricLime }, color: Colors.deepViolet },
  sale: { container: { backgroundColor: Colors.error }, color: Colors.white },
  soldout: { container: { backgroundColor: Colors.deepViolet }, color: Colors.white },
  default: { container: { backgroundColor: Colors.lavenderWhite }, color: Colors.deepViolet },
  lime: { container: { backgroundColor: Colors.electricLime }, color: Colors.deepViolet },
} as const;
