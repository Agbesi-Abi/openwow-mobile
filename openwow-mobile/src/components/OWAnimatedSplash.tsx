import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { Colors } from '@/src/theme/tokens';
import { OWLogo } from './OWLogo';

const WORD = 'openwow';

interface AnimatedSplashProps {
  onAnimationComplete: () => void;
}

export function AnimatedSplash({ onAnimationComplete }: AnimatedSplashProps) {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const letterAnims = useRef(WORD.split('').map(() => new Animated.Value(0))).current;
  const subOpacity = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;
  const ringRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      // Logo draws in
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, friction: 6, tension: 80, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      // Stagger letters in
      Animated.stagger(70, letterAnims.map((a) =>
        Animated.spring(a, { toValue: 1, friction: 8, tension: 60, useNativeDriver: true }),
      )),
      // Subtitle fades in
      Animated.timing(subOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      // Hold
      Animated.delay(500),
      // Fade everything out
      Animated.timing(fadeOut, { toValue: 0, duration: 400, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
    ]);

    sequence.start(() => onAnimationComplete());

    // Continuous ring rotation
    const rotateLoop = Animated.loop(
      Animated.timing(ringRotate, { toValue: 1, duration: 4000, easing: Easing.linear, useNativeDriver: true }),
    );
    rotateLoop.start();

    return () => { rotateLoop.stop(); };
  }, []);

  const rotateInterp = ringRotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      <Animated.View style={{ transform: [{ scale: logoScale }, { rotate: rotateInterp }], opacity: logoOpacity }}>
        <OWLogo size={72} color={Colors.electricLime} />
      </Animated.View>
      <View style={styles.textContainer}>
        {WORD.split('').map((char, i) => (
          <Animated.Text
            key={i}
            style={[
              styles.letter,
              {
                opacity: letterAnims[i],
                transform: [{
                  translateY: letterAnims[i].interpolate({ inputRange: [0, 1], outputRange: [20, 0] }),
                }],
              },
            ]}
          >
            {char}
          </Animated.Text>
        ))}
      </View>
      <Animated.Text style={[styles.subtitle, { opacity: subOpacity }]}>
        find your wow
      </Animated.Text>
    </Animated.View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: Colors.deepViolet,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 24,
    overflow: 'hidden',
  },
  letter: {
    fontFamily: 'Montserrat-Bold',
    fontSize: width < 380 ? 32 : 40,
    color: Colors.softWhite,
    letterSpacing: -1,
  },
  subtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: Colors.electricLime,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginTop: 8,
  },
});
