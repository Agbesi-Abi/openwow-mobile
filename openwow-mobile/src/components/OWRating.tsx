import { View, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { Colors } from '@/src/theme/tokens';
import { Text } from './OWText';

interface OWRatingProps { rating: number; count?: number; size?: number; showCount?: boolean; }

export function OWRating({ rating, count, size = 14, showCount = true }: OWRatingProps) {
  return (
    <View style={styles.container}>
      <Star size={size} color={Colors.electricViolet} fill={Colors.electricViolet} strokeWidth={0} />
      <Text weight="semiBold" size={13} color="ink">{rating.toFixed(1)}</Text>
      {showCount && count !== undefined && <Text size={13} color="inkMuted">({count})</Text>}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flexDirection: 'row', alignItems: 'center', gap: 4 } });
