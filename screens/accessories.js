import React, { useEffect } from 'react';
import { styles } from '../styles';
import { Text, View } from 'react-native';
import { Header } from '../componetns/header';
import { FlatList } from 'react-native-gesture-handler';
import { Item } from '../componetns/item';
import { useState } from 'react/cjs/react.development';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Accessory } from './Accessory';
import { Cart } from './Cart';
import { CreateItem } from './CreateItem';
import { url_accessories } from '../env';

export const Accessories = ({ navigation }) => {

    const url = url_accessories

    const [items, setItems] = useState()
    const [item, setItem] = useState()
    const [visibleAccessory, setVisibleAccessory] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [visibleCart, setvisibleCart] = useState(false)
    const [visibleAdd, setVisibleAdd] = useState(false)


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

    const getAccessories = async () => {

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

    const getAccessory = async (id) => {
        const token = await getTokenFromStorage()
        console.log('pressed - ', id)
        console.log('token - ', token)
        axios({
            method: 'get',
            url: url + id + '/',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        })
            .then((response) => {
                console.log('response ac - >', response.data)
                setItem(response.data)
                console.log('item ac - >', item)
                setVisibleAccessory(true)
                setIsLoading(false)

            });

    }

    useEffect(() => {
        //console.log('use effect first login')
        getAccessories()
        //console.log('item use effect - >', item)

    }, [])

    return (
        <View >
            <Header onPress={() => setVisibleAdd(true)} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.titleText} onPress={getAccessories}>Аксессуары</Text>
                <Text style={{ ...styles.titleText, color: "#007AFF" }} onPress={() => setvisibleCart(true)}>Продано</Text>
                <Text style={{ ...styles.titleText, color: "#007AFF" }} onPress={() => navigation.navigate('Start')}>Выйти</Text>
            </View>

            <Accessory
                visibleAccessory={visibleAccessory}
                setVisibleAccessory={setVisibleAccessory}
                isLoading={isLoading}
                item={item}

            />

            <CreateItem
                visibleAdd={visibleAdd}
                setVisibleAdd={setVisibleAdd}
            />

            <Cart
                visibleCart={visibleCart}
                setVisiblecart={setvisibleCart}
            />




            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <Item
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        getItem={getAccessory}

                    />
                )}

                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={{ fontSize: 20 }}>Подождите</Text>}
                onRefresh={getAccessories}

            />
        </View>
    )
}