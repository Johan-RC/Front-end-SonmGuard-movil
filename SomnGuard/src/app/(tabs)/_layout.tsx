import type React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/shared/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

type TabIconProps = { icon: IconName; label: string; focused: boolean };

function TabIcon({ icon, label, focused }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      <Ionicons name={icon} size={focused ? 36 : 33} color={focused ? theme.colors.accent : theme.colors.accent} />
      <Text style={styles.tabLabel}>{label}</Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: styles.tabBar, tabBarItemStyle: styles.tabBarItem }}>
      <Tabs.Screen name="index" options={{ tabBarIcon: ({ focused }) => <TabIcon icon="home-outline" label="Inicio" focused={focused} /> }} />
      <Tabs.Screen name="monitoring" options={{ tabBarIcon: ({ focused }) => <TabIcon icon="eye-outline" label="Monitoreo" focused={focused} /> }} />
      <Tabs.Screen name="history" options={{ tabBarIcon: ({ focused }) => <TabIcon icon="time-outline" label="Historial" focused={focused} /> }} />
      <Tabs.Screen name="history-filters" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: ({ focused }) => <TabIcon icon="settings-outline" label="Ajustes" focused={focused} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: { height: 72, backgroundColor: '#104863', borderTopWidth: 0, paddingTop: 6, paddingBottom: 6 },
  tabBarItem: { height: 60 },
  tabItem: { alignItems: 'center', justifyContent: 'center', gap: 1 },
  tabLabel: { color: theme.colors.accent, fontSize: 9, fontWeight: '900' },
});