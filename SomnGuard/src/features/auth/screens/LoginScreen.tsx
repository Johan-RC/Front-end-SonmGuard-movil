import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import SomnGuardLogo from '@/shared/components/SomnGuardLogo';
import { AppButton } from '@/shared/components/AppButton';
import { AppTextInput } from '@/shared/components/AppTextInput';
import { Screen } from '@/shared/components/Screen';
import { theme } from '@/shared/theme';
import { useLoginForm } from '@/features/auth/hooks/useLoginForm';

export default function LoginScreen() {
  const router = useRouter();
  const { form, errors, isSubmitting, updateField, submit } = useLoginForm(() => router.replace('/(tabs)'));

  return (
    <Screen keyboard contentStyle={styles.screen}>
      <View style={styles.content}>
        <View style={styles.logoArea}>
          <SomnGuardLogo size={96} />
        </View>
        <View style={styles.formCard}>
          <AppTextInput label="Correo electronico" placeholder="" value={form.email} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} error={errors.email} onChangeText={(text) => updateField('email', text)} />
          <AppTextInput label="Contrasena" placeholder="" value={form.password} secureTextEntry error={errors.password} onChangeText={(text) => updateField('password', text)} />
          {!!errors.general && <Text style={styles.formError}>{errors.general}</Text>}
          <View style={styles.buttonWrap}><AppButton title={isSubmitting ? 'Validando...' : 'Inicio sesion'} onPress={submit} /></View>
          <Pressable accessibilityRole="button" style={styles.linkRow} onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.linkText}>No tienes cuenta? </Text><Text style={[styles.linkText, styles.underline]}>Registrate</Text>
          </Pressable>
          <Pressable accessibilityRole="button" style={styles.linkRow} onPress={() => router.push('/(auth)/forgot-password')}>
            <Text style={[styles.linkText, styles.underline]}>Ha olvidado su contrasena?</Text>
          </Pressable>
          <View style={styles.divider} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { justifyContent: 'center', alignItems: 'center', paddingTop: 24, paddingHorizontal: theme.spacing.xl, paddingBottom: theme.spacing.xxl },
  content: { width: '100%', maxWidth: 380, alignSelf: 'center' },
  logoArea: { alignItems: 'center', marginBottom: 40 },
  formCard: { width: '100%' },
  buttonWrap: { marginTop: theme.spacing.md, marginBottom: theme.spacing.xl, alignSelf: 'center', width: '82%', maxWidth: 280 },
  formError: { color: theme.colors.error, textAlign: 'center', fontSize: theme.fontSize.xs, marginTop: theme.spacing.xs },
  linkRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', marginBottom: theme.spacing.lg },
  linkText: { color: theme.colors.textLink, fontSize: theme.fontSize.sm, fontWeight: '600' },
  underline: { textDecorationLine: 'underline' },
  divider: { marginTop: theme.spacing.lg, borderTopWidth: 1, borderColor: theme.colors.accent, opacity: 0.8 },
});