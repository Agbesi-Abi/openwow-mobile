import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface OWLogoProps {
  size?: number;
  color?: string;
}

/**
 * openwow icon mark — a geometric "w" monogram inside a ring.
 */
export function OWLogo({ size = 72, color = '#C6F135' }: OWLogoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Circle
        cx={60}
        cy={60}
        r={52}
        fill="none"
        stroke={color}
        strokeWidth={4}
      />
      <Path
        d="M32 40 L40 85 L60 48 L80 85 L88 40"
        fill="none"
        stroke={color}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}