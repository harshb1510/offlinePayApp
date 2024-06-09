import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QrCode = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('user_data'));
      const userId = userData.userId;
      const res = await axios.get('https://vihaan007-xxnf.onrender.com/users/getUser', {
        headers: {
          Authorization: `${userId}`, // Using AsyncStorage to retrieve userId
        },
      });
      setUserData(res.data.user);
      setLoading(false);
    } catch (error) {
      console.error('Error occurred while fetching user data:', error);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <QRCode
            value={JSON.stringify({ upiId: userData.upiId, receiverId: userData._id })}
            size={200}
          />
          <Text style={{ marginTop: 20,color:'white' }}>{userData.upiId}</Text>
        </View>
      )}
    </View>
  );
};

export default QrCode;
