import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, Linking } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '@/components/Navbar';


const CheckBalanceOffline = () => {
  const [balance, setBalance] = useState(null);
  const [pin, setPin] = useState('');
  const [localPin, setLocalPin] = useState(null);
  const [showPinModal, setShowPinModal] = useState(true);
  const [senderId, setSenderId] = useState('');

  const getUser = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const res = await axios.get('https://vihaan007-xxnf.onrender.com/users/getUser', {
        headers: {
          Authorization: `${userId}`,
        },
      });
      setLocalPin(res.data.user.pin);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const data = {
    pin: pin,
    senderId: (AsyncStorage.getItem('userId')),
    option: '2',
  };
  const encrypt = Buffer.from(JSON.stringify(data)).toString('base64');

  const handlePinSubmit = () => {
    const smsLink = `sms:+919350728474?body=${encrypt}%0A`;
    Linking.openURL(smsLink);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        <Text style={styles.title}>Bank Balance</Text>
        {balance !== null ? (
          <Text style={styles.balance}>Your current balance: ₹ <Text style={styles.balanceAmount}>{balance}</Text></Text>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
      <Modal visible={showPinModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalLabel}>Enter PIN:</Text>
            <TextInput
              style={styles.input}
              placeholder="PIN"
              secureTextEntry={true}
              value={pin}
              onChangeText={setPin}
            />
            <TouchableOpacity style={styles.button} onPress={handlePinSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balance: {
    fontSize: 18,
  },
  balanceAmount: {
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CheckBalanceOffline;
