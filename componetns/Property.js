import React from 'react';
import { Text, View } from 'react-native';


export const Property = ({ name, value, child }) => {
    return (
        <View style={child ? { paddingStart: 16 } : { paddingStart: 0 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ paddingEnd: 16, fontSize: 18, fontWeight: 'bold', color: 'black' }}>{name}</Text>
                <Text style={{ fontSize: 18, color: 'grey' }}>{value}</Text>
            </View>
        </View >);
}
