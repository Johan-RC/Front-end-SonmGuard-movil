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
          <AppTextInput label="Correo electronico" placeholder="" value={form.email} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} error={errors.email} onChangeText={(text) => updateField('email', text)} wrapperStyle={styles.inputSpacing} />
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
  // Estilos para la pantalla completa
  screen: { 
  justifyContent: 'center', 
  alignItems: 'center', 
  paddingTop: 24, 
  paddingHorizontal: theme.spacing.xl, 
  paddingBottom: theme.spacing.xxl },
  
  // Estilos para el contenedor del contenido (logo + formulario)
  content: { width: '100%', maxWidth: 380, alignSelf: 'center' },
  
  // Estilos para el area del logo
  logoArea: { 
  alignItems: 'center', 
  marginBottom: 60,},
  
  // Estilos para la tarjeta del formulario
  formCard: {
  flex: 1,
  justifyContent: 'center',
  marginBottom: -80,
  padding: 10,
  width: '100%'
    
   },
  
  // Estilos para el botón de inicio de sesión
  buttonWrap: { 
  marginTop: 50, 
  marginBottom: theme.spacing.xl, 
  alignSelf: 'center',
  height: 50, 
  width: '60%', 
  maxWidth: 280 },
  
  // Estilos para el mensaje de error general del formulario
  formError: { 
  color: theme.colors.error, 
  textAlign: 'center', 
  fontSize: theme.fontSize.xs, 
  marginTop: theme.spacing.xs },
  
  // Estilos para la fila de enlaces
  linkRow: { 
  flexDirection: 'row', 
  justifyContent: 'center', 
  alignItems: 'center', 
  alignSelf: 'stretch', 
  marginBottom: theme.spacing.lg },
  
  // Estilos para los enlaces
  linkText: { 
  color: theme.colors.textLink, 
  fontSize: theme.fontSize.sm, 
  fontWeight: '600' },
  
  // Subrayado para los enlaces
  underline: { textDecorationLine: 'underline' },

  // Espacio extra entre correo y contraseña
  inputSpacing: {
    marginBottom: 30,
  },

  //Linea divisoria
  divider: { 
  marginTop: 50,
  borderTopWidth: 1, 
  borderColor: theme.colors.accent, 
  opacity: 0.8 },
});