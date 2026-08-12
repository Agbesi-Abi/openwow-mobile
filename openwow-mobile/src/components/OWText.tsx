import { Text as RNText, type TextProps } from 'react-native';
import { Colors } from '@/src/theme/tokens';

type ColorKey = keyof typeof Colors | string;

interface OWTextProps extends TextProps {
  children: React.ReactNode;
  color?: ColorKey;
  size?: number;
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  align?: 'left' | 'center' | 'right';
  letterSpacing?: number;
  lineHeight?: number;
}

const fontFamilyMap: Record<string, string> = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
};

export function Text({ children, color = 'ink', size, weight = 'regular', align, letterSpacing, lineHeight, style, ...props }: OWTextProps) {
  return (
    <RNText
      style={[{
        color: (Colors as Record<string, string>)[color] ?? color,
        fontFamily: fontFamilyMap[weight],
        ...(size ? { fontSize: size } : {}),
        ...(align ? { textAlign: align } : {}),
        ...(letterSpacing !== undefined ? { letterSpacing } : {}),
        ...(lineHeight ? { lineHeight } : {}),
      }, style]}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function DisplayText({ children, color = 'deepViolet', size = 48, align, letterSpacing = -1, lineHeight, style, ...props }: OWTextProps) {
  return (
    <RNText
      style={[{
        fontFamily: 'Montserrat-Bold',
        fontSize: size,
        color: (Colors as Record<string, string>)[color] ?? color,
        ...(align ? { textAlign: align } : {}),
        letterSpacing,
        ...(lineHeight ? { lineHeight } : {}),
      }, style]}
      {...props}
    >
      {children}
    </RNText>
  );
}
