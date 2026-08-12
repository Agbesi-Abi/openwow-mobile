import { View, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { Colors, Spacing } from '@/src/theme/tokens';
import { Text } from './OWText';
import { OWButton } from './OWButton';

interface OWErrorStateProps { message?: string; onRetry?: () => void; }

export function OWErrorState({ message = 'Something went wrong.', onRetry }: OWErrorStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}><AlertTriangle size={40} color={Colors.error} strokeWidth={1.5} /></View>
      <Text size={16} color="inkLight" align="center" style={styles.message}>{message}</Text>
      {onRetry && <OWButton label="Try Again" onPress={onRetry} variant="outline" size="sm" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.xxxl },
  iconContainer: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(231, 76, 60, 0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  message: { marginBottom: Spacing.lg, maxWidth: 260 },
});
