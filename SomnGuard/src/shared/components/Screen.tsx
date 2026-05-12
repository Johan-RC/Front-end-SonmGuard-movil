import { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@/shared/theme';

type Props = PropsWithChildren<{ keyboard?: boolean; centered?: boolean; contentStyle?: ViewStyle }>;

export function Screen({ children, keyboard = false, centered = false, contentStyle }: Props) {
  const content = (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={[styles.scroll, centered && styles.centered, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );

  if (!keyboard) return content;

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {content}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { flexGrow: 1, backgroundColor: theme.colors.background, paddingHorizontal: theme.spacing.xl, paddingBottom: theme.spacing.xxl },
  centered: { justifyContent: 'center' },
});


