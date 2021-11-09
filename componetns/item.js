
import React from 'react';
import { View, Text } from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from "../styles"



export const Item = ({ id, title, price, getItem }) => {

    const handleGetItem = () => {
        console.log(id)
        getItem(id)
    }

    return (
        <TouchableOpacity style={styles.item} onPress={handleGetItem}>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.mainBoldtext}>{title}</Text>
                </View>
                <Text style={styles.mainText}>{price} руб.</Text>
            </View>

        </TouchableOpacity>)
}