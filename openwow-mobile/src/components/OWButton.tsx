import { useRef } from 'react';
import { Pressable, StyleSheet, ActivityIndicator, Animated, type ViewStyle } from 'react-native';
import { Colors, Typography, Radius, Spacing } from '@/src/theme/tokens';
import { Text } from './OWText';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'lime';
type Size = 'sm' | 'md' | 'lg';

interface OWButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function OWButton({ label, onPress, variant = 'primary', size = 'md', disabled, loading, fullWidth, style }: OWButtonProps) {
  const variantStyle = styles[variant];
  const sizeStyle = sizeStyles[size];
  const textColor = variant === 'lime' ? Colors.deepViolet : (variant === 'outline' || variant === 'ghost') ? Colors.deepViolet : Colors.white;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 4 }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={disabled || loading}>
      <Animated.View
        style={[
          styles.base,
          variantStyle,
          sizeStyle,
          fullWidth && { width: '100%' },
          disabled && { opacity: 0.4 },
          { transform: [{ scale: scaleAnim }] },
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={textColor} size="small" />
        ) : (
          <Text style={{ ...Typography.button, color: textColor }}>{label}</Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' } as ViewStyle,
  primary: { backgroundColor: Colors.deepViolet },
  secondary: { backgroundColor: Colors.electricViolet },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.deepViolet },
  ghost: { backgroundColor: 'transparent' },
  lime: { backgroundColor: Colors.electricLime },
});

const sizeStyles = StyleSheet.create({
  sm: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md },
  md: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg },
  lg: { paddingVertical: Spacing.md + 2, paddingHorizontal: Spacing.xl },
});
