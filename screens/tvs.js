
import React, { useEffect } from 'react';
import { styles } from '../styles';
import { Text, View } from 'react-native';
import { Header } from '../componetns/header';
import { useState } from 'react/cjs/react.development';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from '../componetns/item';
import { TV } from './TV';
import { Cart } from './Cart';
import { CreateItem } from './CreateItem';
import { url_tv } from '../env';



export const TVS = ({ navigation }) => {

    const url = url_tv

    const [items, setItems] = useState()
    const [item, setItem] = useState()
    const [visibleTV, setVisibleTV] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [visibleCart, setvisibleCart] = useState(false)
    const [visibleAdd, setVisibleAdd] = useState(false)

    const getTokenFromStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                console.log(value)
                return value
            }
        } catch (error) {
            console.log(error)
            alert("не удалось получить токен")
        }
    }
    const getTVs = async () => {

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

    const getTV = async (id) => {
        const token = await getTokenFromStorage()
        console.log('pressed - ', id)
        console.log('token - ', token)

        axios({
            method: 'get',
            url: url + id + '/',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        })
            .then((response) => {
                console.log('response tvs - >', response.data)
                setItem(response.data)
                console.log('item tvs - >', item)
                setVisibleTV(true)
                setIsLoading(false)

            });

    }

    useEffect(() => {
        getTVs()
    }, [])

    return (
        <View >
            <Header onPress={() => setVisibleAdd(true)} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.titleText} onPress={getTVs}>Телевизоры</Text>
                <Text style={{ ...styles.titleText, color: "#007AFF" }} onPress={() => setvisibleCart(true)}>Продано</Text>
                <Text style={{ ...styles.titleText, color: "#007AFF" }} onPress={() => navigation.navigate('Start')}>Выйти</Text>
            </View>
            <TV
                visibleTV={visibleTV}
                item={item}
                setVisibleTV={setVisibleTV}
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

                        title={item.title}
                        price={item.price}
                        id={item.id}
                        getItem={getTV}

                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={{ fontSize: 20 }}>Подождите</Text>}
                onRefresh={getTVs}

            />

        </View>
    )
}
