import { View, StyleSheet, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '@/src/theme/tokens';
import { Text } from './OWText';

interface OWSectionHeaderProps { title: string; actionLabel?: string; onAction?: () => void; }

export function OWSectionHeader({ title, actionLabel, onAction }: OWSectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={{ ...Typography.label, color: Colors.deepViolet }}>{title.toUpperCase()}</Text>
      {actionLabel && onAction && (
        <Pressable onPress={onAction} style={({ pressed }) => [styles.action, pressed && { opacity: 0.6 }]}>
          <Text size={13} weight="semiBold" color="electricViolet">{actionLabel}</Text>
          <ChevronRight size={16} color={Colors.electricViolet} strokeWidth={2.5} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, marginBottom: Spacing.md },
  action: { flexDirection: 'row', alignItems: 'center', gap: 2 },
});
