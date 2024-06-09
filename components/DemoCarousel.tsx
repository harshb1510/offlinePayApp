import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Carousel3 from '../assets/images/Carousel3.png';

const DemoCarousel = () => {
    return (
        <View style={styles.container} >
           <Image source={Carousel3} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 200,
    }
});

export default DemoCarousel;
