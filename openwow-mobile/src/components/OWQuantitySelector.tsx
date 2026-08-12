import { View, StyleSheet, Pressable } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { Colors, Radius } from '@/src/theme/tokens';
import { Text } from './OWText';

interface OWQuantitySelectorProps { quantity: number; onDecrease: () => void; onIncrease: () => void; max?: number; }

export function OWQuantitySelector({ quantity, onDecrease, onIncrease, max = 99 }: OWQuantitySelectorProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onDecrease} disabled={quantity <= 1} style={({ pressed }) => [styles.button, quantity <= 1 && { opacity: 0.3 }, pressed && { opacity: 0.6 }]} accessibilityLabel="Decrease quantity">
        <Minus size={16} color={Colors.deepViolet} strokeWidth={2.5} />
      </Pressable>
      <View style={styles.value}><Text weight="semiBold" size={15} color="ink" align="center">{quantity}</Text></View>
      <Pressable onPress={onIncrease} disabled={quantity >= max} style={({ pressed }) => [styles.button, quantity >= max && { opacity: 0.3 }, pressed && { opacity: 0.6 }]} accessibilityLabel="Increase quantity">
        <Plus size={16} color={Colors.deepViolet} strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.lavenderWhite, borderRadius: Radius.pill, padding: 2 },
  button: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  value: { minWidth: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
});
