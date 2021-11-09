import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Button = ({ title, onPress, color }) => {

    return (
        <TouchableOpacity style={{ ...styles.button, backgroundColor: color }} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>)
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 8,
        marginBottom: 8
    },
    text: {
        color: 'white',
        fontSize: 17,
        paddingVertical: 12
    }
})