import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { authService } from '@/features/auth/services/auth.service';
import SomnGuardLogo from '@/shared/components/SomnGuardLogo';
import { Screen } from '@/shared/components/Screen';
import { theme } from '@/shared/theme';

type PasswordErrors = { password?: string; confirmPassword?: string; general?: string };

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const recoveryEmail = String(email ?? '').trim().toLowerCase();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const nextErrors: PasswordErrors = {};
    if (!recoveryEmail || !authService.isRegisteredEmail(recoveryEmail)) nextErrors.general = 'Solicita primero el codigo con un correo registrado.';
    if (!password) nextErrors.password = 'Ingresa una nueva contrasena.';
    else if (password.length < 8) nextErrors.password = 'Usa minimo 8 caracteres.';
    if (!confirmPassword) nextErrors.confirmPassword = 'Confirma la contrasena.';
    else if (confirmPassword !== password) nextErrors.confirmPassword = 'Las contrasenas no coinciden.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    try {
      setIsSubmitting(true);
      await authService.resetPassword(recoveryEmail, password);
      router.replace('/(auth)/login');
    } catch (submitError) {
      setErrors({ general: submitError instanceof Error ? submitError.message : 'No se pudo actualizar la contrasena.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Screen keyboard contentStyle={styles.screen}>
      <View style={styles.content}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>Cambiar Contraseña</Text>
          <Text style={styles.subtitle}>Completa la siguiente informacion</Text>
        </View>

        <View style={styles.logoBlock}>
          <SomnGuardLogo size={116} hideName />
        </View>

        {!!errors.general && <Text style={styles.generalError}>{errors.general}</Text>}

        <PasswordField
          label="Nueva Contraseña"
          value={password}
          error={errors.password}
          onChangeText={(value) => { setPassword(value); if (errors.password || errors.general) setErrors((current) => ({ ...current, password: undefined, general: undefined })); }}
        />
        <PasswordField
          label="Confirmar Contraseña"
          value={confirmPassword}
          error={errors.confirmPassword}
          onChangeText={(value) => { setConfirmPassword(value); if (errors.confirmPassword || errors.general) setErrors((current) => ({ ...current, confirmPassword: undefined, general: undefined })); }}
        />

        <Pressable accessibilityRole="button" disabled={isSubmitting} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, isSubmitting && styles.buttonDisabled]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isSubmitting ? 'Guardando...' : 'Cambiar'}</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

function PasswordField({ label, value, error, onChangeText }: { label: string; value: string; error?: string; onChangeText: (value: string) => void }) {
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, !!error && styles.inputRowError]}>
        <Ionicons name="lock-closed" size={20} color={theme.colors.accent} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry
          placeholder="••••••••••••••••"
          placeholderTextColor={theme.colors.accent}
          style={styles.input}
        />
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { justifyContent: 'center', alignItems: 'center', paddingTop: 28, paddingHorizontal: 28 },
  content: { width: '100%', maxWidth: 380 },
  headerBlock: { alignItems: 'center' },
  title: { color: theme.colors.accent, fontSize: 23, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: theme.colors.accent, fontSize: 12, fontWeight: '800', marginTop: 8, textAlign: 'center' },
  logoBlock: { alignItems: 'center', marginTop: 40, marginBottom: 20 },
  generalError: { color: theme.colors.error, fontSize: 12, fontWeight: '800', textAlign: 'center', marginBottom: 14 },
  fieldBlock: { marginBottom: 28 },
  label: { color: theme.colors.accent, fontSize: 14, fontWeight: '900', marginBottom: 6 },
  inputRow: { minHeight: 43, borderRadius: 4, backgroundColor: '#104863', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, gap: 8 },
  inputRowError: { borderWidth: 1, borderColor: theme.colors.error },
  input: { flex: 1, color: theme.colors.accent, fontSize: 15, fontWeight: '800', paddingVertical: 7 },
  error: { color: theme.colors.error, fontSize: 11, fontWeight: '800', marginTop: 5 },
  button: { alignSelf: 'center', width: '100%', minHeight: 53, borderRadius: 26, backgroundColor: '#104863', alignItems: 'center', justifyContent: 'center', marginTop: 18, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 10, elevation: 4 },
  buttonPressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
  buttonDisabled: { opacity: 0.62 },
  buttonText: { color: theme.colors.accent, fontSize: 20, fontWeight: '900' },
});