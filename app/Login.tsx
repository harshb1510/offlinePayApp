import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 
import { ErrorToast, SuccessToast } from 'react-native-toast-message'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

import logo from '../assets/images/logo.png';

const Login = () => {
  const navigation = useNavigation(); 
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://vihaan007-xxnf.onrender.com/users/login', {
        userName,
        password,
      });
      // Store user data in AsyncStorage
      await AsyncStorage.setItem('user_data', JSON.stringify({
        userId: res.data.user._id,
        user: res.data.user,
        token: res.data.token,
      }));      
      console.log(res.data);
      SuccessToast({text1: 'Login successful!' });
      // Navigate to the home screen or any other screen
      navigation.navigate('index'); 
    } catch (error) {
      console.error('Error occurred:', error);
      ErrorToast({text1: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Login'}</Text>
        </TouchableOpacity>
        <Text style={styles.signUpText}>
          Don't have an account yet?{' '}
          <Text style={styles.signUpLink} onPress={() => navigation.navigate('Signup')}>
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  formContainer: {
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signUpText: {
    textAlign: 'center',
  },
  signUpLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Login;
