import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from '@react-navigation/native';

import logo from '../assets/images/logo.png';

function Navbar() {
  const navigation = useNavigation();

  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState(null); 
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user_data');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    checkUser();
  }, [user]);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('user_data');
      // Update user state to null
      setUser(null);
      // Navigate to the login screen
      navigation.navigate('Login');
      setIsActive(false)
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {/* Logo */}
        <TouchableOpacity style={styles.logoContainer} onPress={()=>navigation.navigate('index')}>
          <Image source={logo} style={styles.logo}/>
        </TouchableOpacity>
        {/* Hamburger */}
        <TouchableOpacity style={styles.hamburger} onPress={toggleActiveClass}>
          <View style={styles.bar}></View>
          <View style={styles.bar}></View>
          <View style={styles.bar}></View>
        </TouchableOpacity>
      </View>
      {/* Menu */}
      {isActive && (
        <View style={styles.menu}>
          {user ? ( // Check if user data is available
            <>
              <Text style={styles.menuLink}>Welcome, {user.user.fullName}</Text>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.menuLink}>Logout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.menuLink}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.menuLink}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.menuLink}>Signup</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300
  },
  logoContainer: {
    paddingVertical: 8,
  },
  logo: {
    width: 100,
    height: 70,
  },
  hamburger: {
    width: 30,
    height: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
  },
  bar: {
    width: 20,
    height: 3,
    backgroundColor: '#120f0b',
    marginVertical: 5,
  },
  menu: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    zIndex: 999
  },
  menuLink: {
    fontSize: 15,
    color: 'black',
    marginBottom: 8,
  },
});

export default Navbar;
