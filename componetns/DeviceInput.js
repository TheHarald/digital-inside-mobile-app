import React, { useContext } from 'react';
import { Modal, StyleSheet, Text, View, Picker, TextInput } from 'react-native';
import { styles } from '../styles';


export const DeviceInput = ({ title, placeholder, onChangeText }) => {

    return (
        <View>

            <Text style={{ paddingStart: 8, fontSize: 14, color: 'grey' }}>{title}</Text>
            <TextInput
                style={styles.inputAdd}
                placeholder={placeholder}
                onChangeText={onChangeText}
            />
        </View>
    )

}