import { useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle, XCircle, Info } from 'lucide-react-native';
import { Colors, Radius, Spacing, Shadows } from '@/src/theme/tokens';
import { Text } from './OWText';
import { useToast, type ToastType } from '@/src/state/ToastContext';

const iconMap = { success: CheckCircle, error: XCircle, info: Info };
const colorMap: Record<ToastType, string> = { success: Colors.success, error: Colors.error, info: Colors.deepViolet };

function ToastItem({ id, message, type, onDismiss }: { id: string; message: string; type: ToastType; onDismiss: (id: string) => void }) {
  const slideAnim = useRef(new Animated.Value(-30)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const Icon = iconMap[type];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 300, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, [slideAnim, opacityAnim]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: -20, duration: 200, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => onDismiss(id));
  };

  return (
    <Animated.View style={{ transform: [{ translateY: slideAnim }], opacity: opacityAnim }}>
      <Pressable onPress={handleDismiss} style={styles.toast}>
        <Icon size={20} color={colorMap[type]} strokeWidth={2} />
        <Text size={14} weight="medium" color="ink" style={styles.message}>{message}</Text>
      </Pressable>
    </Animated.View>
  );
}

export function OWToast() {
  const { toasts, dismissToast } = useToast();
  const insets = useSafeAreaInsets();
  if (toasts.length === 0) return null;

  return (
    <View style={[styles.container, { top: insets.top + 60 }]} pointerEvents="box-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} id={toast.id} message={toast.message} type={toast.type} onDismiss={dismissToast} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', left: 0, right: 0, alignItems: 'center', zIndex: 1000, elevation: 1000 },
  toast: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.white, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, borderRadius: Radius.pill, marginBottom: Spacing.sm, ...Shadows.floating, maxWidth: '90%' },
  message: { flexShrink: 1 },
});
