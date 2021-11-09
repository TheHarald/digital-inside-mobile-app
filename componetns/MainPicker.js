import React, { useContext, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react/cjs/react.development';
import { Button } from '../componetns/Button';
import { DeviceInput } from '../componetns/DeviceInput';
import { styles } from '../styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url_main } from '../env';



export const MainPicker = ({ model, title, setParam, selectedValue }) => {

    const [items, setItems] = useState([])
    const [item, setItem] = useState({})


    const url = url_main

    const getTokenFromStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                return value
            }
        } catch (error) {
            alert("не удалось получить токен")
        }
    }

    const getItems = async () => {

        const token = await getTokenFromStorage()
        console.log(`${url}${model}/`)
        axios({
            method: 'get',
            url: `${url}${model}/`,
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        })
            .then((response) => {
                //console.log(response.data)
                setItems(response.data)
            });

    }

    useEffect(() => {
        getItems();
    }, [])

    useEffect(() => {
        getItems();
    }, [selectedValue])

    useEffect(() => {
        console.log('item ->', item);
        //console.log('function', setParam)
        setParam(item);

    }, [item])



    return (

        <View>
            <Text style={{ paddingStart: 8, fontSize: 14, color: 'grey' }}>{title}</Text>
            <View style={styles.picker}>
                <Picker

                    selectedValue={item}
                    onValueChange={(itemValue, itemIndex) => {
                        setItem(itemValue);
                    }}

                >
                    {items.map((item) => (<Picker.Item label={item.title} value={item.id} key={item.id} />))}

                </Picker>
            </View>

        </View>

    )
}