import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle } from 'lucide-react-native';
import { Text, DisplayText } from '@/src/components/OWText';
import { OWButton } from '@/src/components/OWButton';
import { Colors, Spacing } from '@/src/theme/tokens';

export default function ConfirmationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const circleScale = useRef(new Animated.Value(0)).current;
  const circleOpacity = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textSlide = useRef(new Animated.Value(20)).current;
  const subOpacity = useRef(new Animated.Value(0)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(circleScale, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }),
        Animated.timing(circleOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]),
      Animated.spring(iconScale, { toValue: 1, friction: 4, tension: 100, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(textSlide, { toValue: 0, duration: 300, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.timing(subOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(btnOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: circleScale }], opacity: circleOpacity }]}>
          <Animated.View style={{ transform: [{ scale: iconScale }] }}>
            <CheckCircle size={64} color={Colors.electricLime} strokeWidth={1.5} />
          </Animated.View>
        </Animated.View>
        <Animated.View style={{ opacity: textOpacity, transform: [{ translateY: textSlide }] }}>
          <DisplayText size={32} align="center">Order Confirmed!</DisplayText>
        </Animated.View>
        <Animated.View style={{ opacity: subOpacity }}>
          <Text size={16} color="inkMuted" align="center" style={{ marginTop: Spacing.sm, maxWidth: 280 }}>
            Thank you for your order. We will send you a confirmation and tracking details shortly.
          </Text>
        </Animated.View>
      </View>
      <Animated.View style={{ opacity: btnOpacity, paddingHorizontal: Spacing.md, paddingBottom: insets.bottom || Spacing.lg }}>
        <OWButton label="Track My Order" onPress={() => router.replace('/orders')} fullWidth size="lg" />
        <OWButton label="Continue Shopping" onPress={() => router.replace('/(tabs)')} variant="outline" fullWidth size="lg" style={{ marginTop: Spacing.sm }} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl },
  iconContainer: { width: 120, height: 120, borderRadius: 60, backgroundColor: Colors.lavenderWhite, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg },
});
