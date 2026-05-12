import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/shared/components/AppButton';
import { AppTextInput } from '@/shared/components/AppTextInput';
import { Screen } from '@/shared/components/Screen';
import { theme } from '@/shared/theme';
import { useAccountForm } from '@/features/profile/hooks/useAccountForm';

export default function AccountScreen() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const { form, errors, isSubmitting, updateField, submit } = useAccountForm(() => {
    setSaved(true);
    Alert.alert('Cuenta actualizada', 'Los cambios en tus datos se han guardado correctamente.');
  });

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" style={styles.backButton} onPress={() => router.push('/profile' as any)}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Cuenta</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Datos personales</Text>
        <AppTextInput label="Nombre completo" placeholder="Nombre y apellidos" value={form.name} error={errors.name} onChangeText={(text) => updateField('name', text)} />
        <AppTextInput label="Correo electrónico" placeholder="correo@ejemplo.com" value={form.email} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} error={errors.email} onChangeText={(text) => updateField('email', text)} />
        <AppTextInput label="Teléfono" placeholder="3001234567" value={form.phone} keyboardType="phone-pad" error={errors.phone} onChangeText={(text) => updateField('phone', text)} />
        <AppTextInput label="Fecha de nacimiento" placeholder="DD / MM / AAAA" value={form.birthDate} error={errors.birthDate} onChangeText={(text) => updateField('birthDate', text)} />
        <View style={styles.buttonWrap}>
          <AppButton title={isSubmitting ? 'Guardando...' : 'Guardar cambios'} onPress={submit} />
        </View>
        {saved && <Text style={styles.helpText}>Tu perfil se actualizó correctamente.</Text>}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 0, paddingBottom: 0 },
  topBar: { height: 67, backgroundColor: '#104863', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
  backButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginRight: 24 },
  backIcon: { color: theme.colors.accent, fontSize: 28, fontWeight: '900' },
  headerTitle: { color: theme.colors.accent, fontSize: 25, fontWeight: '900', textDecorationLine: 'underline' },
  content: { width: '100%', maxWidth: 420, alignSelf: 'center', paddingTop: 24, paddingHorizontal: 24, paddingBottom: 92 },
  sectionTitle: { color: theme.colors.accent, fontSize: 20, fontWeight: '900', marginBottom: 16 },
  buttonWrap: { marginTop: theme.spacing.lg, width: '100%' },
  helpText: { marginTop: theme.spacing.md, color: theme.colors.textMuted, fontSize: theme.fontSize.sm, textAlign: 'center' },
});
