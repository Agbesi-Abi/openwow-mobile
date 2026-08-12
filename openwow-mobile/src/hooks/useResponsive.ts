import { useWindowDimensions, Platform } from 'react-native';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

const BREAKPOINTS: Record<Breakpoint, number> = { sm: 0, md: 480, lg: 768, xl: 1024 };

export function useResponsive(): {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  isTablet: boolean;
  isDesktop: boolean;
  columns: number;
  cardWidth: number;
  horizontalCardWidth: number;
  contentPadding: number;
  maxContentWidth: number;
} {
  const { width, height } = useWindowDimensions();

  let breakpoint: Breakpoint = 'sm';
  if (width >= BREAKPOINTS.xl) breakpoint = 'xl';
  else if (width >= BREAKPOINTS.lg) breakpoint = 'lg';
  else if (width >= BREAKPOINTS.md) breakpoint = 'md';

  const isTablet = width >= BREAKPOINTS.lg;
  const isDesktop = width >= BREAKPOINTS.xl;

  const columns = isDesktop ? 4 : isTablet ? 3 : 2;
  const contentPadding = isTablet ? 24 : 16;
  const maxContentWidth = isDesktop ? 1200 : isTablet ? 900 : 9999;

  const cardGap = 16;
  const cardWidth = (width - contentPadding * 2 - cardGap * (columns - 1)) / columns;
  const horizontalCardWidth = isTablet ? 200 : width * 0.42;

  return { width, height, breakpoint, isTablet, isDesktop, columns, cardWidth, horizontalCardWidth, contentPadding, maxContentWidth };
}
