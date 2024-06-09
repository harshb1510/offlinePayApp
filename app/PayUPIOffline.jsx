import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

const PayUPI = () => {
  const [showReceiverModal, setShowReceiverModal] = useState(true);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    senderId: '',
    receiverId: '',
    amount: '',
    pin: '',
    option: '1',
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId !== null) {
        setPaymentData((prevData) => ({
          ...prevData,
          senderId: userId,
        }));
      } else {
        console.error('User ID not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleReceiverModalClose = () => {
    setShowReceiverModal(false);
    setShowAmountModal(true);
  };

  const handleAmountSubmit = () => {
    setShowAmountModal(false);
    setShowPinModal(true);
  };

  const handlePinSubmit = () => {
    console.log('Payment Data:', paymentData);
    const encrypt = btoa(JSON.stringify(paymentData));

    const smsLink = `sms:+919350728474?body=${encrypt}%0A`;
    Linking.openURL(smsLink)
      .then(() => {
        console.log('SMS app opened');
      })
      .catch((err) => {
        console.error('Failed to open SMS app:', err);
        Alert.alert('Payment Failed!');
      });
    setShowPinModal(false);
  };

  return (
    <>
      {showReceiverModal && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Enter Receiver's UPI ID:</Text>
            <TextInput
              value={paymentData.receiverId}
              onChangeText={(text) =>
                setPaymentData((prevData) => ({
                  ...prevData,
                  receiverId: text,
                }))
              }
              style={styles.input}
            />
            <Button title="Next" onPress={handleReceiverModalClose} />
          </View>
        </View>
      )}
      {showAmountModal && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Enter Amount:</Text>
            <TextInput
              value={paymentData.amount}
              onChangeText={(text) =>
                setPaymentData((prevData) => ({
                  ...prevData,
                  amount: text,
                }))
              }
              style={styles.input}
            />
            <Button title="Next" onPress={handleAmountSubmit} />
          </View>
        </View>
      )}
      {showPinModal && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Enter PIN:</Text>
            <TextInput
              value={paymentData.pin}
              onChangeText={(text) =>
                setPaymentData((prevData) => ({
                  ...prevData,
                  pin: text,
                }))
              }
              style={styles.input}
            />
            <Button title="Pay" onPress={handlePinSubmit} />
          </View>
        </View>
      )}
    </>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
};

export default PayUPI;
