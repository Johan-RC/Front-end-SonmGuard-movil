import { useRouter } from 'expo-router';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@/shared/components/AppButton';
import { AppTextInput } from '@/shared/components/AppTextInput';
import { Screen } from '@/shared/components/Screen';
import { useAppTheme } from '@/shared/theme';
import { useRegisterForm } from '@/features/auth/hooks/useRegisterForm';

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        router.replace('/(auth)/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, router]);

  const { form, errors, isSubmitting, updateField, submit } = useRegisterForm(() => {
    setShowSuccessModal(true);
  });

  return (
    <Screen keyboard contentStyle={styles.scroll}>
      <Pressable accessibilityRole="button" style={styles.closeButton} onPress={() => router.back()}><Text style={styles.closeText}>x</Text></Pressable>
      <Text style={styles.title}>{t('auth.register.title')}</Text>
      <Text style={styles.subtitle}>{t('auth.register.subtitle')}</Text>
      <View style={styles.row}>
        <AppTextInput wrapperStyle={styles.half} placeholder={t('auth.register.firstName')} value={form.firstName} autoCapitalize="words" error={errors.firstName} onChangeText={(text) => updateField('firstName', text)} />
        <AppTextInput wrapperStyle={styles.half} placeholder={t('auth.register.lastName')} value={form.lastName} autoCapitalize="words" error={errors.lastName} onChangeText={(text) => updateField('lastName', text)} />
      </View>
      <AppTextInput placeholder={t('auth.register.email')} value={form.email} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} error={errors.email} onChangeText={(text) => updateField('email', text)} />
      <AppTextInput placeholder={t('auth.register.password')} value={form.password} secureTextEntry error={errors.password} onChangeText={(text) => updateField('password', text)} />
      <AppTextInput placeholder={t('auth.register.confirmPassword')} value={form.confirmPassword} secureTextEntry error={errors.confirmPassword} onChangeText={(text) => updateField('confirmPassword', text)} />
      <Text style={styles.phoneLabel}>{t('auth.register.phone')}</Text>
      <View style={[styles.phoneRow, !!errors.phone && styles.phoneRowError]}>
        <Text style={styles.phonePrefix}>+57</Text>
        <TextInput style={styles.phoneInput} value={form.phone} keyboardType="phone-pad" maxLength={10} placeholder="" placeholderTextColor={theme.colors.placeholder} onChangeText={(text) => updateField('phone', text)} />
      </View>
      {!!errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
      <View style={styles.buttonWrap}><AppButton title={isSubmitting ? t('common.submitting') : t('common.submit')} onPress={submit} /></View>

      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalContent}>
            <Text style={styles.successModalTitle}>{t('auth.register.successTitle')}</Text>
            <Text style={styles.successModalMessage}>{t('auth.register.successMessage')}</Text>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

function createStyles(theme: ReturnType<typeof useAppTheme>['theme']) {
  return StyleSheet.create({
  scroll: { paddingTop: theme.spacing.xl, paddingHorizontal: theme.spacing.xl },
  closeButton: { width: 40, height: 40, justifyContent: 'center', marginBottom: theme.spacing.sm },
  closeText: { color: theme.colors.textMuted, fontSize: 32, lineHeight: 34 },
  title: { color: theme.colors.accent, fontSize: theme.fontSize.xxl, fontWeight: '900', textAlign: 'center', marginBottom: theme.spacing.md },
  subtitle: { color: theme.colors.accent, fontSize: theme.fontSize.sm, textAlign: 'left', marginBottom: 42 },
  row: { flexDirection: 'row', gap: theme.spacing.sm },
  half: { flex: 1 },
  phoneLabel: { color: theme.colors.accent, fontSize: theme.fontSize.xs, fontWeight: '800', letterSpacing: 1.5, marginBottom: theme.spacing.xs, marginTop: theme.spacing.xs },
  phoneRow: { flexDirection: 'row', alignItems: 'center', minHeight: 44, backgroundColor: theme.colors.input, borderRadius: theme.radius.input, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 4 },
  phoneRowError: { borderColor: theme.colors.error, backgroundColor: theme.colors.errorBg },
  phonePrefix: { color: theme.colors.accent, fontSize: theme.fontSize.sm, fontWeight: '700', paddingHorizontal: theme.spacing.md },
  phoneInput: { flex: 1, color: theme.colors.text, fontSize: theme.fontSize.sm, paddingVertical: theme.spacing.sm, paddingRight: theme.spacing.md },
  error: { color: theme.colors.error, fontSize: theme.fontSize.xs, marginBottom: theme.spacing.sm, marginLeft: 4 },
  buttonWrap: { marginTop: theme.spacing.xl, alignSelf: 'center', width: '100%' },
  successModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  successModalContent: { backgroundColor: theme.colors.header, borderRadius: 17, padding: 24, width: '80%', maxWidth: 320, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 10, elevation: 10 },
  successModalTitle: { color: theme.colors.accent, fontSize: 24, fontWeight: '900', marginBottom: 12 },
  successModalMessage: { color: theme.colors.accent, fontSize: 16, textAlign: 'center' },
  });
}
