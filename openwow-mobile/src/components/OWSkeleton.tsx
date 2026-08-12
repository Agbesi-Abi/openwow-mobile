import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, type DimensionValue, Easing } from 'react-native';
import { Colors, Radius } from '@/src/theme/tokens';

interface OWSkeletonProps { width?: DimensionValue; height?: DimensionValue; radius?: number; style?: object; }

export function OWSkeleton({ width = '100%', height = 20, radius, style }: OWSkeletonProps) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.6] });

  return (
    <Animated.View style={[styles.skeleton, { width, height, borderRadius: radius ?? Radius.sm, opacity }, style]} />
  );
}

const styles = StyleSheet.create({ skeleton: { backgroundColor: Colors.border } });

export function ProductCardSkeleton() {
  return (
    <View style={cardStyles.container}>
      <OWSkeleton height={'100%' as DimensionValue} radius={Radius.lg} style={cardStyles.image} />
      <OWSkeleton width={'60%'} height={16} style={cardStyles.title} />
      <OWSkeleton width={'40%'} height={14} style={cardStyles.subtitle} />
      <OWSkeleton width={'30%'} height={16} style={cardStyles.price} />
    </View>
  );
}

const cardStyles = StyleSheet.create({
  container: { width: '48%', marginBottom: 24, marginHorizontal: 4 },
  image: { aspectRatio: 0.75, marginBottom: 8 },
  title: { marginTop: 4 },
  subtitle: { marginTop: 4 },
  price: { marginTop: 8 },
});

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <View style={gridStyles.row}>
      {Array.from({ length: count }).map((_, i) => <ProductCardSkeleton key={i} />)}
    </View>
  );
}

const gridStyles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16 } });
