import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="details" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="Signup" options={{ headerShown: false }} />
      <Stack.Screen name='QrScanner' options={{ headerShown: false }} />
      <Stack.Screen name='CheckBalance' options={{ headerShown: false }}/>
      <Stack.Screen name='CheckbalanceOffline' options={{ headerShown: false }}/>
      <Stack.Screen name='Transaction' options={{ headerShown: false }}/>
      <Stack.Screen name='TransactionOffline' options={{ headerShown: false }}/>
      <Stack.Screen name='OfflinePay' options={{ headerShown: false }}/>
      <Stack.Screen name='PayUPI' options={{ headerShown: false }}/>
      <Stack.Screen name='PayUPIOffline' options={{ headerShown: false }}/>
      <Stack.Screen name='QrCode' options={{ headerShown: false }}/>
      <Stack.Screen name='HomeOffline' options={{ headerShown: false }}/>

    </Stack>
    </ThemeProvider>
  );
}
