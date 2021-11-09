import React from 'react';
import { styles } from '../styles';
import { Button, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export const Header = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText} >Digital Inside</Text>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.headerText} >Добавить товар</Text>
                </TouchableOpacity>
            </View>
        </View >)
}
