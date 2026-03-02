import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
export default function RootLayout() {
  return (<>
    <StatusBar style="light" />
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0A0A0F' } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="paywall" options={{ presentation: 'modal' }} />
    </Stack>
  </>);
}
