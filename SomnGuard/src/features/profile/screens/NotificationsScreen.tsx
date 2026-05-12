import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Screen } from '@/shared/components/Screen';
import { theme } from '@/shared/theme';

export default function NotificationsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    securityAlerts: true,
    accountActivity: true,
    reminders: true,
    emailNotifications: false,
    dailySummary: true,
    criticalAlerts: true,
  });

  function toggleSetting(key: keyof typeof settings) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" style={styles.backButton} onPress={() => router.push('/profile' as any)}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Notificaciones</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Notificaciones push</Text>
        <Text style={styles.sectionDescription}>Recibe alertas importantes en tu dispositivo.</Text>

        <View style={styles.optionCard}>
          <View style={styles.optionRow}>
            <View>
              <Text style={styles.optionTitle}>Alertas de seguridad</Text>
              <Text style={styles.optionSubtitle}>Notificaciones sobre eventos de seguridad.</Text>
            </View>
            <Switch
              value={settings.securityAlerts}
              onValueChange={() => toggleSetting('securityAlerts')}
              thumbColor={settings.securityAlerts ? theme.colors.accent : theme.colors.text}
              trackColor={{ false: '#5a8095', true: theme.colors.accentLight }}
            />
          </View>

          <View style={styles.optionRow}>
            <View>
              <Text style={styles.optionTitle}>Actividad de la cuenta</Text>
              <Text style={styles.optionSubtitle}>Notificaciones sobre inicios de sesión y cambios.</Text>
            </View>
            <Switch
              value={settings.accountActivity}
              onValueChange={() => toggleSetting('accountActivity')}
              thumbColor={settings.accountActivity ? theme.colors.accent : theme.colors.text}
              trackColor={{ false: '#5a8095', true: theme.colors.accentLight }}
            />
          </View>

          <View style={styles.optionRow}>
            <View>
              <Text style={styles.optionTitle}>Recordatorios</Text>
              <Text style={styles.optionSubtitle}>Recordatorios de tareas y actividades importantes.</Text>
            </View>
            <Switch
              value={settings.reminders}
              onValueChange={() => toggleSetting('reminders')}
              thumbColor={settings.reminders ? theme.colors.accent : theme.colors.text}
              trackColor={{ false: '#5a8095', true: theme.colors.accentLight }}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Notificaciones por correo</Text>
        <Text style={styles.sectionDescription}>Recibe mensajes con tu actividad y alertas importantes.</Text>

        <View style={styles.optionCard}>
          <View style={styles.optionRow}>
            <View>
              <Text style={styles.optionTitle}>Resumen diario</Text>
              <Text style={styles.optionSubtitle}>Recibe un resumen diario de tu actividad.</Text>
            </View>
            <Switch
              value={settings.dailySummary}
              onValueChange={() => toggleSetting('dailySummary')}
              thumbColor={settings.dailySummary ? theme.colors.accent : theme.colors.text}
              trackColor={{ false: '#5a8095', true: theme.colors.accentLight }}
            />
          </View>

          <View style={styles.optionRow}>
            <View>
              <Text style={styles.optionTitle}>Alertas críticas</Text>
              <Text style={styles.optionSubtitle}>Recibe alertas críticas inmediatamente.</Text>
            </View>
            <Switch
              value={settings.criticalAlerts}
              onValueChange={() => toggleSetting('criticalAlerts')}
              thumbColor={settings.criticalAlerts ? theme.colors.accent : theme.colors.text}
              trackColor={{ false: '#5a8095', true: theme.colors.accentLight }}
            />
          </View>
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
  sectionTitle: { color: theme.colors.accent, fontSize: 20, fontWeight: '900' },
  sectionDescription: { color: theme.colors.textMuted, fontSize: theme.fontSize.sm, marginBottom: 12 },
  optionCard: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.card, padding: 20, gap: 16, shadowColor: '#000', shadowOpacity: 0.14, shadowRadius: 10, elevation: 5 },
  optionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  optionTitle: { color: theme.colors.accent, fontSize: theme.fontSize.md, fontWeight: '900', marginBottom: 4 },
  optionSubtitle: { color: theme.colors.textMuted, fontSize: theme.fontSize.sm, lineHeight: 20, maxWidth: '80%' },
});
