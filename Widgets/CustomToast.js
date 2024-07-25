import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';

const CustomToast = ({ message, visible }) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    hideToast();
                }, 2000); 
            });
        } else {
            fadeAnim.setValue(0);
        }
    }, [visible]);

    const hideToast = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    message: {
        color: '#fff',
    },
});

export default CustomToast;
