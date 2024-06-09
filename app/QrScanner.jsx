import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QrScanner = () => {
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    senderId: '',
    receiverUpi: '',
    amount: '',
    pin: '',
  });
  const [scanner, setScanner] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('user_data'));
      const userId = userData.userId;
      const res = await axios.get('https://vihaan007-xxnf.onrender.com/users/getUser', {
        headers: {
          Authorization: userId,
        },
      });
      setPaymentData((prevData) => ({
        ...prevData,
        senderId: res.data.user._id,
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const qrData = async (text) => {
    try {
      const parsedData = JSON.parse(text);
      setPaymentData((prevData) => ({
        ...prevData,
        receiverUpi: parsedData.upiId,
      }));
      setScanner(false);
      setShowAmountModal(true);
    } catch (error) {
      console.error('Error parsing QR code data:', error);
    }
  };

  const handleAmountModalClose = () => {
    setShowAmountModal(false);
    setShowPinModal(false);
    setPaymentData({
      senderId: '',
      receiverId: '',
      amount: '',
      pin: '',
    });
    setScanner(true);
  };

  const handlePay = () => {
    setShowAmountModal(false);
    setShowPinModal(true);
  };

  const handlePinSubmit = async () => {
    console.log('Payment Data:', paymentData);
    try {
      const res = await axios.post('https://vihaan007-xxnf.onrender.com/users/sendMoney', paymentData);
      console.log('Payment Response:', res.data);
      Alert.alert('Payment Successful!');
      // Handle navigation after successful payment
    } catch (error) {
      console.error('Error making payment:', error);
      Alert.alert('Payment Failed!');
    }
    setShowPinModal(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1}}>
        <BarCodeScanner
          onBarCodeScanned={({ type, data }) => {
            qrData(data);
          }}
          style={{ flex: 1 }}
        />
        {showAmountModal && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Text>UPI ID: {paymentData.receiverUpi}</Text>
              <TextInput
                value={paymentData.amount}
                onChangeText={(text) => setPaymentData((prevData) => ({ ...prevData, amount: text }))}
                placeholder="Enter Amount to Pay"
                keyboardType="numeric"
                style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5, padding: 10, marginVertical: 10 }}
              />
              <Button title="Pay" onPress={handlePay} />
            </View>
          </View>
        )}
        {showPinModal && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <TextInput
                value={paymentData.pin}
                onChangeText={(text) => setPaymentData((prevData) => ({ ...prevData, pin: text }))}
                placeholder="Enter PIN"
                secureTextEntry={true}
                style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5, padding: 10, marginVertical: 10 }}
              />
              <Button title="Pay" onPress={handlePinSubmit} />
            </View>
          </View>
        )}
      </View>
      {!showAmountModal && !showPinModal && <Link href="/offline"></Link>}
    </View>
  );
};

export default QrScanner;
