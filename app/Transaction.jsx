import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/Navbar';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const res = await axios.get("https://vihaan007-xxnf.onrender.com/users/getUser", {
                headers: {
                    Authorization: `${await AsyncStorage.getItem("userId")}`
                }
            });
            console.log(res.data.user.transactions);
            setTransactions(res.data.user.transactions.reverse());
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setLoading(false);
        }
    };

    const renderTransactionItem = ({ item }) => (
        <View style={{ backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, borderRadius: 8, padding: 16, marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <View>
                    <Text style={{ fontSize: 14, color: 'gray' }}>{item.type === 'Debit' ? 'To' : 'From'}: <Text style={{ fontWeight: 'bold' }}>{item.upiId}</Text></Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: item.type === 'Debit' ? 'red' : 'green', fontWeight: 'bold', marginRight: 4 }}>{item.type === 'Debit' ? '-' : '+'}</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.amount}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 10, color: 'gray' }}>Ref No. {item.referenceNumber}</Text>
                <Text style={{ fontSize: 14, color: 'gray' }}>{item.date}</Text>
            </View>
        </View>
    );

    const renderSkeletonLoader = () => (
        <View style={{ padding: 16 }}>
            {[...Array(5)].map((_, index) => (
                <View key={index} style={{ backgroundColor: '#f0f0f0', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                    <View style={{ height: 4, backgroundColor: '#d0d0d0', marginBottom: 8 }} />
                    <View style={{ height: 3, backgroundColor: '#d0d0d0', width: '50%', marginBottom: 12 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ fontSize: 10, color: '#d0d0d0' }}><Text>Ref No. -</Text></View>
                        <View style={{ fontSize: 14, color: '#d0d0d0' }}><Text>--/--/----</Text></View>
                    </View>
                </View>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 ,marginTop:20}}>
            <Navbar />
            <View style={{ flex: 4, padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Transaction History</Text>
                {loading ? (
                    renderSkeletonLoader()
                    ) : (
                        <FlatList
                        data={transactions}
                        renderItem={renderTransactionItem}
                        keyExtractor={(item) => item._id}
                        showsVerticalScrollIndicator={false}
                        />
                        )}
            </View>
        </View>
                    </SafeAreaView>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgb(238, 203, 196)",
        marginTop:50
      },
};

export default Transaction;
