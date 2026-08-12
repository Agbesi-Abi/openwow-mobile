import { View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Colors, Radius, Spacing } from '@/src/theme/tokens';
import { Text } from './OWText';

interface OWSearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
  onSubmit?: () => void;
  editable?: boolean;
}

export function OWSearchBar({ placeholder = 'Search products...', value, onChangeText, autoFocus, onSubmit, editable = true }: OWSearchBarProps) {
  const router = useRouter();

  return (
    <Pressable onPress={() => { if (!editable) router.push('/search'); }} style={styles.container}>
      <View style={styles.inputContainer}>
        <Search size={18} color={Colors.inkMuted} strokeWidth={2} />
        {editable ? (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={Colors.inkMuted}
            style={styles.input}
            autoFocus={autoFocus}
            onSubmitEditing={onSubmit}
            returnKeyType="search"
          />
        ) : (
          <Text size={15} color="inkMuted" style={styles.placeholder}>{placeholder}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.lavenderWhite, borderRadius: Radius.pill, paddingHorizontal: Spacing.md, height: 48, gap: Spacing.sm },
  input: { flex: 1, fontFamily: 'Inter-Regular', fontSize: 15, color: Colors.ink, padding: 0 },
  placeholder: { flex: 1 },
});
