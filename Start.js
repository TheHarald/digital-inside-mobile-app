import React, { useEffect, useState, useContext } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from './componetns/Button';
import { AppContext } from './context';
import { Property } from './componetns/Property';
import axios from 'axios';
import { url_auth } from './env';

const url = url_auth

export const Start = ({ navigation }) => {



    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    // const { getTokenFromStorage } = useContext(AppContext)

    const getTokenFromStorage = async () => {
        console.log('============get token  from sotarge start==============')
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                //console.log(value);
                return value
            }
        } catch (error) {
            alert("не удалось получить токен")
        }
    }


    const getToken = async () => {
        console.log(email, password)


        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         email: email,
        //         password: password
        //     })
        // };

        // fetch(url, requestOptions)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('status ->', data)
        //         setToken(data)
        //         console.log('token form get = ', token.access)
        //         AsyncStorage.setItem('token', token.access)
        //     })
        //     .catch(alert('Нет доступа к базе данных'));


        axios({
            method: 'POST',
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: email,
                password: password
            }

        }).then(
            response => {
                console.log(response.data.access)
                console.log(response.status)
                // setToken(response.data.access)
                AsyncStorage.setItem('token', response.data.access)
            }).catch((error) => {
                console.log('catch', error)
                alert('Нет доступа к базе данных')
            }
            )



    }


    logIn = async () => {
        await getToken()
        const value = await getTokenFromStorage()
        console.log('value ->', value)


        if (value !== undefined) {
            navigation.navigate('Main')
        }

    }







    return (


        <View style={styles.main}>
            <TextInput
                style={styles.input}
                placeholder={'Имя'}
                onChangeText={text => setEmail(text)}
                autoCapitalize='none'
            />

            <TextInput
                style={styles.input}
                placeholder={'Пароль'}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            />
            <Button title={'Войти'} color={'#007AFF'} onPress={logIn} />
            <Button title={'Show token'} color={'#121212'} onPress={getTokenFromStorage} />
            <Text style={styles.textRef}
                onPress={() => console.log('register')}
            >Зарегистрироваться</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#E2E2E2',
        width: '100%',
        height: '100%',
        paddingTop: 300 // временно
    },
    input: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        paddingVertical: 6,
        paddingLeft: 6,
        marginHorizontal: 8,
        fontSize: 17,
        marginBottom: 10

    },
    image: {
        alignSelf: 'center',
        marginTop: 110,
        marginBottom: 100

    },
    text: {
        fontSize: 17,
        alignSelf: 'center'
    },
    textRef: {
        marginTop: 10,
        fontSize: 17,
        alignSelf: 'center',
        color: '#007AFF'

    }

})