import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useContext } from 'react/cjs/react.development';
import { Header } from '../componetns/header';
import { ItemProduct } from '../componetns/itemProduct';
import { AppContext } from '../context';
import { bought_products } from '../env';
import { styles } from '../styles';
import { Phone } from './Phone';


export const Cart = ({ visibleCart, setVisiblecart }) => {

    const url = bought_products

    const [items, setItems] = useState()


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


    const getProducts = async () => {

        const token = await getTokenFromStorage()
        console.log('token - ', token)
        axios({
            method: 'get',
            url: url,
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        })
            .then((response) => {
                console.log(response.data)
                setItems(response.data)
            });

    }

    useEffect(() => {
        //console.log('use effect first login')
        getProducts()
        //console.log('item use effect - >', item)

    }, [])



    return (
        <Modal
            visible={visibleCart}
            animationType={'slide'}
        >
            <View style={{ marginTop: 16 }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => setVisiblecart(false)} >
                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginHorizontal: 16 }} > Корзина</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => getProducts()}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginHorizontal: 16 }}  >Обновить</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <ItemProduct
                        id={item.id}
                        title={item.title}
                        price={item.user.role}
                        getItem={() => console.log('tap')}

                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={{ fontSize: 20 }}>Подождите</Text>}
                onRefresh={getProducts}

            />
        </Modal>
    )
}

