import React, { useEffect } from 'react';
import { styles } from '../styles';
import { Text, View } from 'react-native';
import { Header } from '../componetns/header';
import { FlatList } from 'react-native-gesture-handler';
import { Item } from '../componetns/item';
import { useState } from 'react/cjs/react.development';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { PC } from './PC';
import { Cart } from './Cart';
import { CreateItem } from './CreateItem';
import { url_pc } from '../env';


export const PCS = ({ navigation }) => {

    const url = url_pc

    const [items, setItems] = useState()
    const [item, setItem] = useState()
    const [visiblePC, setVisiblePC] = useState(false)
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


    const getPCs = async () => {

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


    const getPC = async (id) => {
        const token = await getTokenFromStorage()
        console.log('pressed - ', id)
        console.log('token - ', token)
        axios({
            method: 'get',
            url: url + id + '/',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        })
            .then((response) => {
                console.log('response pc - >', response.data)
                setItem(response.data)
                console.log('item pc - >', item)
                setVisiblePC(true)
                setIsLoading(false)

            });

    }

    useEffect(() => {
        //console.log('use effect first login')
        getPCs()
        //console.log('item use effect - >', item)

    }, [])

    return (
        <View >
            <Header onPress={() => setVisibleAdd(true)} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.titleText} onPress={getPCs}>Компьютеры</Text>
                <Text style={{ ...styles.titleText, color: "#007AFF" }} onPress={() => setvisibleCart(true)}>Продано</Text>
                <Text style={{ ...styles.titleText, color: "#007AFF" }} onPress={() => navigation.navigate('Start')}>Выйти</Text>
            </View>

            <PC

                setVisiblePC={setVisiblePC}
                isLoading={isLoading}
                visiblePC={visiblePC}
                item={item}

            />

            <Cart
                visibleCart={visibleCart}
                setVisiblecart={setvisibleCart}
            />

            <CreateItem
                visibleAdd={visibleAdd}
                setVisibleAdd={setVisibleAdd}
            />


            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <Item
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        getItem={getPC}

                    />
                )}

                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={{ fontSize: 20 }}>Подождите</Text>}
                onRefresh={getPC}

            />
        </View>
    )
}