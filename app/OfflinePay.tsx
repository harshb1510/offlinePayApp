import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, Alert,Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OfflinePay() {
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [senderUpiId, setSenderUpiId] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [encrypted, setEncrypted] = useState("");
  const [paymentData, setPaymentData] = useState({
    senderId: AsyncStorage.getItem("userId"),
    receiverId: "",
    amount: "",
    pin: "",
    option: "1",
  });

  const [scanner, setScanner] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getUser();
  }, [senderUpiId]);

  const getUser = async () => {
    try {
      const res = await axios.get(
        "https://vihaan007-xxnf.onrender.com/users/getUser",
        {
          headers: {
            Authorization: `${AsyncStorage.getItem("userId")}`,
          },
        }
      );
      // setPaymentData((prevData) => ({
      //   ...prevData,
      //   senderId: res.data.user._id,
      // }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const qrData = async (text:any) => {
    try {
      const parsedData = JSON.parse(text);
      setPaymentData((prevData) => ({
        ...prevData,
        receiverId: parsedData.upiId,
      }));
      setScanner(false);
      setShowAmountModal(true);
    } catch (error) {
      console.error("Error parsing QR code data:", error);
    }
  };

  const handleAmountModalClose = () => {
    setShowAmountModal(false);
    setShowPinModal(false);
    setPaymentData({
      senderId: "",
      receiverId: "",
      amount: "",
      pin: "",
    });
    setScanner(true);
  };

  const handlePay = async () => {
    setShowAmountModal(false);
    setShowPinModal(true);
  };

  const encrypt = btoa(JSON.stringify(paymentData));

  const handlePinSubmit = () => {
    console.log("Payment Data:", paymentData);

    const smsLink = `sms:+919350728474?body=${encrypt}%0A`;
    Alert.alert("Payment", "Redirecting to SMS...", [
      {
        text: "OK",
        onPress: () => {
          Linking.openURL(smsLink);
        },
      },
    ]);
    setShowPinModal(false);
  };

  return (
    <>
      <View style={styles.container}>
        {scanner && (
          <BarCodeScanner
            onBarCodeScanned={(data) => qrData(data)}
            style={StyleSheet.absoluteFillObject}
          />
        )}
        {showAmountModal && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showAmountModal}
            onRequestClose={handleAmountModalClose}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={handleAmountModalClose}>
                  <Text style={styles.closeButton}>&times;</Text>
                </TouchableOpacity>
                <Text>UPI ID: {paymentData.receiverId}</Text>
                <Text>Enter Amount to Pay:</Text>
                <TextInput
                  keyboardType="numeric"
                  value={paymentData.amount}
                  onChangeText={(text) =>
                    setPaymentData((prevData) => ({
                      ...prevData,
                      amount: text,
                    }))
                  }
                  style={styles.input}
                />
                <Button title="Pay" onPress={handlePay} />
              </View>
            </View>
          </Modal>
        )}
        {showPinModal && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showPinModal}
            onRequestClose={handleAmountModalClose}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={handleAmountModalClose}>
                  <Text style={styles.closeButton}>&times;</Text>
                </TouchableOpacity>
                <Text>Enter PIN:</Text>
                <TextInput
                  secureTextEntry
                  value={paymentData.pin}
                  onChangeText={(text) =>
                    setPaymentData((prevData) => ({
                      ...prevData,
                      pin: text,
                    }))
                  }
                  style={styles.input}
                />
                <Button title="Pay Now" onPress={handlePinSubmit} />
              </View>
            </View>
          </Modal>
        )}
        <Text>Maximum Limit: 2000Rs.</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginVertical: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 20,
    color: "gray",
  },
});
