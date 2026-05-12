import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/shared/components/AppButton';
import { Screen } from '@/shared/components/Screen';
import { theme } from '@/shared/theme';

export default function SupportScreen() {
  const router = useRouter();

  function handleFaq() {
    Alert.alert('Preguntas frecuentes', 'Aquí iría una lista de preguntas frecuentes para ayudarte con las dudas más comunes.');
  }

  function handleContact() {
    Alert.alert('Contactar soporte', 'Tu solicitud ha sido enviada. Nuestro equipo se pondrá en contacto contigo pronto.');
  }

  function handleReport() {
    Alert.alert('Reportar un problema', 'Gracias por tu reporte. Revisaremos el problema y te contactaremos si es necesario.');
  }

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" style={styles.backButton} onPress={() => router.push('/profile' as any)}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Soporte</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>¿Necesitas ayuda?</Text>
          <Text style={styles.cardDescription}>Estamos aquí para ayudarte con cualquier duda o problema.</Text>
          <AppButton title="Contactar soporte" onPress={handleContact} />
        </View>

        <View style={styles.cardAction}>
          <Text style={styles.actionTitle}>Preguntas frecuentes</Text>
          <Text style={styles.actionSubtitle}>Consulta las dudas más comunes.</Text>
          <AppButton title="Ver FAQ" variant="outline" onPress={handleFaq} />
        </View>

        <View style={styles.cardAction}>
          <Text style={styles.actionTitle}>Reportar un problema</Text>
          <Text style={styles.actionSubtitle}>Cuéntanos sobre un error o sugerencia.</Text>
          <AppButton title="Reportar" variant="outline" onPress={handleReport} />
        </View>
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
  content: { width: '100%', maxWidth: 420, alignSelf: 'center', paddingTop: 24, paddingHorizontal: 24, paddingBottom: 92, gap: 18 },
  card: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.card, padding: 20, gap: 12, shadowColor: '#000', shadowOpacity: 0.14, shadowRadius: 10, elevation: 5 },
  cardTitle: { color: theme.colors.accent, fontSize: theme.fontSize.md, fontWeight: '900' },
  cardDescription: { color: theme.colors.textMuted, fontSize: theme.fontSize.sm, lineHeight: 20 },
  cardAction: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.card, padding: 20, gap: 10, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, elevation: 4 },
  actionTitle: { color: theme.colors.accent, fontSize: theme.fontSize.md, fontWeight: '900' },
  actionSubtitle: { color: theme.colors.textMuted, fontSize: theme.fontSize.sm, lineHeight: 20 },
});
