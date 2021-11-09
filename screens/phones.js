
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useContext } from 'react/cjs/react.development';
import { Header } from '../componetns/header';
import { Item } from '../componetns/item';
import { AppContext } from '../context';
import { url_phone } from '../env';
import { styles } from '../styles';
import { Cart } from './Cart';
import { CreateItem } from './CreateItem';
import { Phone } from './Phone';

export const Phones = ({ navigation }) => {

    const url = url_phone

    const [items, setItems] = useState()
    const [item, setItem] = useState()
    const [visiblePhone, setVisiblePhone] = useState(false)
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
    const getPhones = async () => {

        const token = await getTokenFromStorage()
        //console.log('token - ', token)
        axios({
            method: 'get',
            url: url,
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        })
            .then((response) => {
                //console.log(response.data)
                setItems(response.data)
            });

    }

    const getPhone = async (id) => {
        const token = await getTokenFromStorage()
        //console.log('pressed - ', id)
        //console.log('token - ', token)
        axios({
            method: 'get',
            url: url + id + '/',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        })
            .then((response) => {
                //console.log('response - >', response.data)
                setItem(response.data)
                //console.log('item - >', item)
                setVisiblePhone(true)
                setIsLoading(false)

            });

    }

    useEffect(() => {
        //console.log('use effect first login')
        getPhones()
        //console.log('item use effect - >', item)

    }, [])

    return (
        <View >
            <Header onPress={() => setVisibleAdd(true)} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.titleText} onPress={getPhones}>Телефоны</Text>
                <Text style={{ ...styles.titleText, color: "#007AFF" }} onPress={() => setvisibleCart(true)}>Продано</Text>
                <Text style={{ ...styles.titleText, color: "#007AFF" }}
                    onPress={() => {
                        navigation.navigate('Start')
                        AsyncStorage.removeItem('token')

                    }}>Выйти</Text>
            </View>
            <Phone
                visiblePhone={visiblePhone}
                item={item}
                setVisiblePhone={setVisiblePhone}
                isLoading={isLoading}

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
                        getItem={getPhone}

                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={{ fontSize: 20 }}>Подождите</Text>}
                onRefresh={getPhones}

            />

        </View>
    )
}

