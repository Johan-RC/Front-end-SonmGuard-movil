import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import SomnGuardLogo from '@/shared/components/SomnGuardLogo';
import { AppButton } from '@/shared/components/AppButton';
import { Screen } from '@/shared/components/Screen';
import { theme } from '@/shared/theme';
import { useMonitoring } from '@/features/monitoring/hooks/useMonitoring';

export default function DashboardScreen() {
  const router = useRouter();
  const { isMonitoring, toggleMonitoring } = useMonitoring();
  return (
    <Screen centered contentStyle={styles.screen}>
      <View style={styles.logoBlock}>
        <SomnGuardLogo size={156} />
        <Text style={styles.subtitle}>Monitoreo de conductor en tiempo real</Text>
      </View>
      <View style={styles.actions}>
        <AppButton title={isMonitoring ? 'Detener monitoreo' : 'Iniciar monitoreo'} onPress={() => router.push('/(tabs)/monitoring')} />
        <AppButton title="Ver historial" onPress={() => router.push('/(tabs)/history')} variant="outline" />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 34, paddingTop: theme.spacing.xxl },
  logoBlock: { alignItems: 'center', marginBottom: 54 },
  subtitle: { color: theme.colors.text, fontSize: 15, fontWeight: '900', letterSpacing: 0.3, marginTop: -2 },
  actions: { width: '100%', gap: theme.spacing.sm },
});


