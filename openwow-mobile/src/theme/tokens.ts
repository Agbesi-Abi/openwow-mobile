import { Platform } from 'react-native';

export const Colors = {
  deepViolet: '#29213D',
  deepVioletDark: '#1E1730',
  deepVioletLight: '#3A2F52',
  electricLime: '#C6FF00',
  electricLimeDark: '#A8D900',
  electricViolet: '#A855F7',
  electricVioletLight: '#C08AFA',
  lavenderWhite: '#F4F0FF',
  softWhite: '#FCFBFF',
  ink: '#17151C',
  inkLight: '#4A4458',
  inkMuted: '#8B8599',
  white: '#FFFFFF',
  black: '#000000',
  success: '#2ECC71',
  warning: '#F5A623',
  error: '#E74C3C',
  surface: '#FFFFFF',
  surfaceAlt: '#F4F0FF',
  border: '#E8E4F0',
  borderDark: '#D1CCE0',
  overlay: 'rgba(41, 33, 61, 0.5)',
} as const;

export const Typography = {
  displayLarge: { fontFamily: 'Montserrat-Bold', fontSize: 64, lineHeight: 68, letterSpacing: -2 },
  display: { fontFamily: 'Montserrat-Bold', fontSize: 48, lineHeight: 52, letterSpacing: -1 },
  heading1: { fontFamily: 'Montserrat-Bold', fontSize: 32, lineHeight: 38, letterSpacing: -0.5 },
  heading2: { fontFamily: 'Montserrat-Bold', fontSize: 24, lineHeight: 30, letterSpacing: -0.3 },
  heading3: { fontFamily: 'Montserrat-SemiBold', fontSize: 20, lineHeight: 26 },
  body: { fontFamily: 'Inter-Regular', fontSize: 16, lineHeight: 24 },
  bodySmall: { fontFamily: 'Inter-Regular', fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: 'Inter-Regular', fontSize: 12, lineHeight: 16 },
  button: { fontFamily: 'Inter-Bold', fontSize: 15, lineHeight: 20, letterSpacing: 0.5 },
  buttonSmall: { fontFamily: 'Inter-SemiBold', fontSize: 13, lineHeight: 18, letterSpacing: 0.3 },
  label: { fontFamily: 'Inter-SemiBold', fontSize: 11, lineHeight: 16, letterSpacing: 1.2 },
  price: { fontFamily: 'Inter-Bold', fontSize: 16, lineHeight: 22 },
  priceLarge: { fontFamily: 'Inter-Bold', fontSize: 20, lineHeight: 26 },
} as const;

export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64 } as const;
export const Radius = { none: 0, sm: 4, md: 8, lg: 12, xl: 16, xxl: 24, pill: 999 } as const;

export const Shadows = {
  card: Platform.select({
    ios: { shadowColor: '#29213D', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
    android: { elevation: 2 },
  }),
  header: Platform.select({
    ios: { shadowColor: '#29213D', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4 },
    android: { elevation: 1 },
  }),
  floating: Platform.select({
    ios: { shadowColor: '#29213D', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 16 },
    android: { elevation: 6 },
  }),
} as const;

export const Currency = { symbol: 'GH₵', code: 'GHS', locale: 'en-GH' } as const;

export const formatPrice = (amount: number): string =>
  `${Currency.symbol} ${amount.toLocaleString('en-GH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
