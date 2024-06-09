import DemoCarousel from '@/components/DemoCarousel';
import HeroOnline from '@/components/HeroOnline';
import Navbar from '@/components/Navbar';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.contain}>
      <Navbar/>
      <DemoCarousel/>
      <HeroOnline/>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgb(238, 203, 196)",
    marginTop:50
  },
  contain:{
    flexDirection:'column',
  }
});
