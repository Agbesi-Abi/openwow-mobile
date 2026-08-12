import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export function hapticImpact(style: 'light' | 'medium' | 'heavy' = 'light') {
  if (Platform.OS === 'web') return;
  try {
    const map = {
      light: Haptics.ImpactFeedbackStyle.Light,
      medium: Haptics.ImpactFeedbackStyle.Medium,
      heavy: Haptics.ImpactFeedbackStyle.Heavy,
    };
    Haptics.impactAsync(map[style]);
  } catch { /* ignore */ }
}

export function hapticNotify(type: 'success' | 'warning' | 'error' = 'success') {
  if (Platform.OS === 'web') return;
  try {
    const map = {
      success: Haptics.NotificationFeedbackType.Success,
      warning: Haptics.NotificationFeedbackType.Warning,
      error: Haptics.NotificationFeedbackType.Error,
    };
    Haptics.notificationAsync(map[type]);
  } catch { /* ignore */ }
}
