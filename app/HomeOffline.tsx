import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import HeroOffline from '../components/HeroOffline';
import Navbar from '@/components/Navbar';
import DemoCarousel from '@/components/DemoCarousel';

const HomeOffline = () => {
  const navigation = useNavigation();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('userId');
      if (!user) {
        navigation.navigate('Login');
        return;
      }

      const res = await axios.get('https://vihaan007-xxnf.onrender.com/users/getUser', {
        headers: {
          Authorization: `${user}`,
        },
      });

      console.log(res.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <DemoCarousel />
      <HeroOffline />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgb(238, 203, 196)",
    marginTop:50
  },
});

export default HomeOffline;
