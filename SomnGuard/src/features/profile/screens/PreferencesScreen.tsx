import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/shared/components/AppButton';
import { Screen } from '@/shared/components/Screen';
import { theme } from '@/shared/theme';
import { usePreferencesForm } from '@/features/profile/hooks/usePreferencesForm';

const options = {
  theme: ['Oscuro', 'Claro'] as const,
  language: ['Español', 'Inglés'] as const,
  units: ['Métrico', 'Imperial'] as const,
};

export default function PreferencesScreen() {
  const router = useRouter();
  const { form, isSubmitting, updateField, submit } = usePreferencesForm(() => {
    Alert.alert('Preferencias guardadas', 'Tus opciones se han actualizado correctamente.');
  });

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" style={styles.backButton} onPress={() => router.push('/profile' as any)}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Preferencias</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Apariencia</Text>
        <View style={styles.optionCard}>
          {options.theme.map((value) => (
            <Pressable key={value} style={[styles.optionItem, form.theme === value && styles.optionSelected]} onPress={() => updateField('theme', value)}>
              <Text style={[styles.optionText, form.theme === value && styles.optionTextSelected]}>{value}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Idioma</Text>
        <View style={styles.optionCard}>
          {options.language.map((value) => (
            <Pressable key={value} style={[styles.optionItem, form.language === value && styles.optionSelected]} onPress={() => updateField('language', value)}>
              <Text style={[styles.optionText, form.language === value && styles.optionTextSelected]}>{value}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Unidades</Text>
        <View style={styles.optionCard}>
          {options.units.map((value) => (
            <Pressable key={value} style={[styles.optionItem, form.units === value && styles.optionSelected]} onPress={() => updateField('units', value)}>
              <Text style={[styles.optionText, form.units === value && styles.optionTextSelected]}>{value}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Otras preferencias</Text>
        <Pressable style={styles.preferenceCard} onPress={() => updateField('soundsEnabled', !form.soundsEnabled)}>
          <Text style={styles.preferenceLabel}>Sonidos de la app</Text>
          <Text style={styles.preferenceValue}>{form.soundsEnabled ? 'Activados' : 'Desactivados'}</Text>
        </Pressable>

        <View style={styles.buttonWrap}>
          <AppButton title={isSubmitting ? 'Guardando...' : 'Guardar cambios'} onPress={submit} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  
  screen: { 
    paddingHorizontal: 0, 
    paddingBottom: 0, 
    paddingTop: '15%' },
  
  topBar: { 
    height: 67, 
    backgroundColor: '#104863', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 14 },
  
  backButton: { 
    width: 44, 
    height: 44, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 24 },
  
  backIcon: { 
    color: theme.colors.accent, 
    fontSize: 28, 
    fontWeight: '900' },
  
  headerTitle: { 
    color: theme.colors.accent, 
    fontSize: 25, 
    fontWeight: '900', 
    textDecorationLine: 'underline' },
  
  content: { 
    width: '100%', 
    maxWidth: 420, 
    alignSelf: 'center', 
    paddingTop: 24, 
    paddingHorizontal: 24, 
    paddingBottom: 92 },
  
  sectionTitle: { 
    color: theme.colors.accent, 
    fontSize: 20, 
    fontWeight: '900', 
    marginBottom: 12 },
  
  optionCard: { 
    backgroundColor: theme.colors.surface, 
    borderRadius: theme.radius.card, 
    padding: 14, marginBottom: 24 },
  
  optionItem: { 
    paddingVertical: 16, 
    paddingHorizontal: 18, 
    borderRadius: theme.radius.input, 
    backgroundColor: theme.colors.background, 
    marginBottom: 10 },
  
  optionSelected: { 
    backgroundColor: theme.colors.accent, 
    shadowColor: '#000', 
    shadowOpacity: 0.15, 
    shadowRadius: 8, 
    elevation: 4 },
  
  optionText: { 
    color: theme.colors.text, 
    fontSize: theme.fontSize.sm, 
    fontWeight: '700' },
  
  optionTextSelected: { 
    color: theme.colors.background },
  
  preferenceCard: { 
    backgroundColor: theme.colors.surface, 
    borderRadius: theme.radius.card, 
    padding: 18, flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOpacity: 0.14, 
    shadowRadius: 8, 
    elevation: 4 },
  
  preferenceLabel: { 
    color: theme.colors.accent, 
    fontSize: theme.fontSize.sm, 
    fontWeight: '800' },
  
  preferenceValue: { 
    color: theme.colors.textMuted, 
    fontSize: theme.fontSize.sm },
  
  buttonWrap: { 
    marginTop: theme.spacing.lg, 
    width: '100%' },
});
