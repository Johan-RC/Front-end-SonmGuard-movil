import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/shared/components/Screen';
import { sessions } from '@/features/history/mocks/history.mock';
import { theme } from '@/shared/theme';

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Historial</Text>
          <Text style={styles.subtitle}>Tus ultimas sesiones de conduccion</Text>
        </View>
        <Pressable accessibilityRole="button" style={styles.filterButton} onPress={() => router.push('/(tabs)/history-filters')}>
          <Ionicons name="filter-outline" size={24} color={theme.colors.accent} />
        </Pressable>
      </View>

      {sessions.map((session) => (
        <View key={session.id} style={styles.card}>
          <View style={styles.cardLeft}>
            <Text style={styles.cardDate}>{session.date}</Text>
            <Text style={styles.cardMeta}>{session.km} km · {session.duration}</Text>
          </View>
          <View style={[styles.badge, session.alerts > 0 && styles.badgeActive]}>
            <Text style={[styles.badgeText, session.alerts > 0 && styles.badgeTextActive]}>{session.alerts} {session.alerts === 1 ? 'alerta' : 'alertas'}</Text>
          </View>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { padding: theme.spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.lg },
  title: { color: theme.colors.accent, fontSize: theme.fontSize.xl, fontWeight: '900', marginBottom: 4 },
  subtitle: { color: theme.colors.textMuted, fontSize: theme.fontSize.sm },
  filterButton: { width: 44, height: 44, borderRadius: 13, backgroundColor: '#104863', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.border },
  card: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.card, borderWidth: 1, borderColor: theme.colors.border, padding: theme.spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.sm },
  cardLeft: { flex: 1, paddingRight: theme.spacing.sm },
  cardDate: { color: theme.colors.text, fontWeight: '800', fontSize: theme.fontSize.sm },
  cardMeta: { color: theme.colors.textMuted, fontSize: theme.fontSize.xs, marginTop: 4 },
  badge: { backgroundColor: theme.colors.input, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: theme.colors.border },
  badgeActive: { backgroundColor: 'rgba(255,153,0,0.15)', borderColor: 'rgba(255,153,0,0.5)' },
  badgeText: { color: theme.colors.textMuted, fontSize: theme.fontSize.xs, fontWeight: '800' },
  badgeTextActive: { color: '#ff9900' },
});