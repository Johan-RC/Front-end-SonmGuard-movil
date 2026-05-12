import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/shared/components/AppButton';
import { Screen } from '@/shared/components/Screen';
import { theme } from '@/shared/theme';

export default function PrivacyScreen() {
  const router = useRouter();

  function handleDownload() {
    Alert.alert('Descarga iniciada', 'Se está preparando tu copia de datos. En breve la recibirás.');
  }

  function handlePermissions() {
    Alert.alert('Permisos de la app', 'Esta sección te permitirá revisar los permisos que la app utiliza en tu dispositivo.');
  }

  function handleDelete() {
    Alert.alert('Eliminar cuenta', '¿Estás seguro de que deseas eliminar tu cuenta y todos tus datos?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => router.replace('/(auth)/login') },
    ]);
  }

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" style={styles.backButton} onPress={() => router.push('/profile' as any)}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Privacidad de datos</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Gestión de datos</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Descargar mis datos</Text>
          <Text style={styles.cardDescription}>Descarga una copia completa de tus datos asociados a la cuenta.</Text>
          <AppButton title="Descargar datos" onPress={handleDownload} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Permisos de la aplicación</Text>
          <Text style={styles.cardDescription}>Gestiona los permisos que has concedido a la aplicación.</Text>
          <AppButton title="Ver permisos" variant="outline" onPress={handlePermissions} />
        </View>

        <View style={styles.cardDanger}>
          <Text style={styles.cardTitleDanger}>Eliminar cuenta</Text>
          <Text style={styles.cardDescription}>Esta acción eliminará tu cuenta y todos tus datos de forma permanente.</Text>
          <AppButton title="Eliminar cuenta" variant="danger" onPress={handleDelete} />
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
  sectionTitle: { color: theme.colors.accent, fontSize: 20, fontWeight: '900', marginBottom: 16 },
  card: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.card, padding: 20, gap: 12, shadowColor: '#000', shadowOpacity: 0.14, shadowRadius: 10, elevation: 5 },
  cardDanger: { backgroundColor: '#141d2b', borderRadius: theme.radius.card, padding: 20, gap: 12, borderWidth: 1, borderColor: 'rgba(255, 85, 85, 0.4)' },
  cardTitle: { color: theme.colors.accent, fontSize: theme.fontSize.md, fontWeight: '900' },
  cardTitleDanger: { color: '#ff5555', fontSize: theme.fontSize.md, fontWeight: '900' },
  cardDescription: { color: theme.colors.textMuted, fontSize: theme.fontSize.sm, lineHeight: 20 },
});
