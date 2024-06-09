import React, { useEffect, useState } from 'react';
import { Button, Linking, StyleSheet, View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionOffline = () => {
    const [senderId, setSenderId] = useState('');

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
            // setSenderId(res.data.user._id);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleSubmit = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const data = {
            senderId: userId,
            option: '3',
        };
        const encrypt = btoa(JSON.stringify(data));

        // Replace this with your SMS library code to send SMS in React Native
        const smsLink = `sms:+919350728474?body=${encrypt}%0A`;
        Linking.openURL(smsLink);
    };

    return (
        <View style={styles.container}>

        <Button
            title="Get last 5 transactions details on SMS"
            onPress={handleSubmit}
            style={{ marginTop: 10 }}
            color="#007bff"
            />
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
export default TransactionOffline;
