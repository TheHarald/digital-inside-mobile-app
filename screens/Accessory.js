import React, { useContext } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Button } from '../componetns/Button';
import { Property } from '../componetns/Property';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { url_accessories } from '../env';



export const Accessory = ({ visibleAccessory, item, setVisibleAccessory, isLoading }) => {

    const url = url_accessories

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

    const buyItem = async (id) => {

        const token = await getTokenFromStorage()
        console.log('token - ', token)
        console.log(`${url}${id}/buy/`)
        axios({
            method: 'post',
            url: `${url}${id}/buy/`,
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        })
            .then((response) => {
                console.log(response.data)
                alert('Товар куплен')
            });

    }

    const deleteItem = async (id) => {
        const token = await getTokenFromStorage()
        axios({
            method: 'delete',
            url: `${url}${id}/delete/`,
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        })
            .then((response) => {
                // console.log(response.data)
                Alert.alert(
                    'Удалено',
                    `Товар ${response.data.title} удалён`,
                    [{ text: 'Закрыть', onPress: () => setVisibleAccessory(false) }])
            });
    }

    return (

        <Modal visible={visibleAccessory}
            animationType='slide'
        >

            <View style={{ marginTop: 16 }} >
                {isLoading ? <Text>Loading</Text> :
                    <View>
                        <Button title={'Назад'} onPress={() => setVisibleAccessory(false)} color={'#121212'} />
                        <View style={{ paddingHorizontal: 16 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'grey' }}>Характеристики</Text>
                                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                                    <Text
                                        style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}
                                    >Удалить</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{item.title}</Text>
                            <Property name={'Тип'} value={item.type.title.toString()} />
                            <Property name={'Бренд'} value={item.brand.title} />
                            <Property name={'Цвет'} value={item.color} />
                            <Property name={'Габариты'} value={item.dimensions} />
                            <Property name={'Дата добавления'} value={item.date} />
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 37, paddingTop: 16, fontWeight: 'bold', marginEnd: 16 }}>{item.price}</Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 32 }}>руб.</Text>
                            </View>

                        </View>
                        <View style={{ paddingTop: 16 }}>
                            <Button title={'Купить'} onPress={() => buyItem(item.id)} color={'#007AFF'} />
                        </View>

                    </View>
                }
            </View>
        </Modal>
    )
}