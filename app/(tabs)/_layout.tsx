import { Tabs } from 'expo-router';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: '#0A0A0F', borderTopColor: '#1a1a1a' },
      tabBarActiveTintColor: '#6366F1',
      tabBarInactiveTintColor: '#555',
    }}>
      <Tabs.Screen name="index" options={{ title: 'Clips', tabBarIcon: () => null }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: () => null }} />
    </Tabs>
  );
}
