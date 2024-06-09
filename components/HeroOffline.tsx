import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link, useNavigation } from '@react-navigation/native';


const HeroOffline = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            {/* First Row */}
            <View style={styles.row}>
                {/* Icon 1 */}
                
                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('QrScanner')}>
                        <MaterialCommunityIcons name="qrcode-scan" size={24} color="black" />
                        <Text>Scan QR</Text>
                    </TouchableOpacity>
                
                {/* Icon 2 */}
                
                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('QrCode')}>
                        <FontAwesome name="rupee" size={24} color="black" />
                        <Text>Receive Money</Text>
                    </TouchableOpacity>
                
                {/* Icon 3 */}
                
                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('TransactionOffline')}>
                        <Ionicons name="receipt" size={24} color="black" />
                        <Text>History</Text>
                    </TouchableOpacity>
                
            </View>

            {/* Second Row */}
            <View style={styles.row}>
                {/* Icon 4 */}
            
                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('CheckbalanceOffline')}>
                        <MaterialIcons name="account-balance" size={24} color="black" />
                        <Text>Check Balance</Text>
                    </TouchableOpacity>
                
                {/* Icon 5 */}
                
                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('PayUPIOffline')}>
                        <MaterialIcons name="toll" size={24} color="black" />
                        <Text>Pay via UPI</Text>
                    </TouchableOpacity>
                
                {/* Icon 6 */}
                
                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('index')}>
                        <MaterialIcons name="signal-cellular-4-bar" size={24} color="black" />
                        <Text>Pay Online</Text>
                    </TouchableOpacity>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 50,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        justifyContent: 'center',
        textAlign: 'auto',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '25%',
    },
    link: {
        textDecoration: 'none',
    },
});

export default HeroOffline;
