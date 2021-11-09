import React, { useContext, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, TextInput, RefreshControl } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react/cjs/react.development';
import { Button } from '../componetns/Button';
import { DeviceInput } from '../componetns/DeviceInput';
import { styles } from '../styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainPicker } from '../componetns/MainPicker';
import { ScrollView } from 'react-native-gesture-handler';
import { url_main } from '../env';
export const CreateItem = ({ visibleAdd, setVisibleAdd }) => {

    const [selectedValue, setSelectedValue] = useState("phone");
    const [update, setUpdate] = useState(false)


    const [isLoading, setIsLoading] = useState(true)

    /* params */
    const [title, setTitle] = useState();
    const [brand, setBrand] = useState();
    const [processor, setProcessor] = useState();
    const [gpu, setGpu] = useState();
    const [ram, setRam] = useState();
    const [rom, setRom] = useState();
    const [os, setOS] = useState();
    const [display, setDisplay] = useState();
    const [price, setPrice] = useState();
    const [dimensions, setDimensions] = useState();
    const [color, setColor] = useState();
    const [date, setDate] = useState();
    const [weight, setWeight] = useState();
    const [matrix, setMatrix] = useState();
    const [connectionType, setConnectionType] = useState();
    const [acType, setAcType] = useState();
    const [pcType, setPcType] = useState();

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


    const url = url_main


    const createItem = async (model, body) => {
        const token = await getTokenFromStorage()

        console.log(model)
        console.log(body)
        console.log(`${url}${model}/create/`)

        axios({
            method: 'post',
            url: `${url}${model}/create/`,
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            data: body

        })
            .then((response) => {
                console.log(response)
                alert(`Товар ${response.data.title} создан`)
            });
    }





    const selector = (value) => {

        switch (value) {

            case 'phone': return <View>
                <DeviceInput
                    title={'Название'} placeholder={'Название'}
                    onChangeText={text => setTitle(text)}
                />
                <MainPicker
                    model={'phone_brand'}
                    title={'Бренд телефона'}
                    setParam={setBrand}
                    selectedValue={selectedValue}
                />
                <MainPicker
                    model={'phone_processor'}
                    title={'Процессор'}
                    setParam={setProcessor}
                    selectedValue={selectedValue}
                />

                <MainPicker
                    model={'phone_gpu'}
                    title={'Графическое ядро'}
                    setParam={setGpu}
                    selectedValue={selectedValue}
                />
                <MainPicker
                    model={'phone_ram'}
                    title={'Оперативная память'}
                    setParam={setRam}
                    selectedValue={selectedValue}
                />
                <MainPicker
                    model={'phone_rom'}
                    title={'Память'}
                    setParam={setRom}
                    selectedValue={selectedValue}
                />
                <MainPicker
                    model={'phone_os'}
                    title={'Операционная система'}
                    setParam={setOS}
                    selectedValue={selectedValue}
                />
                <MainPicker
                    model={'display'}
                    title={'Дисплей'}
                    setParam={setDisplay}
                    selectedValue={selectedValue}
                />

                <DeviceInput
                    title={'Цена'} placeholder={'Сумма'}
                    onChangeText={text => setPrice(text)}
                />
                <DeviceInput
                    title={'Габаритные размеры'} placeholder={'Размеры в мм'}
                    onChangeText={text => setDimensions(text)}
                />
                <DeviceInput
                    title={'Цвет'} placeholder={'Цвет'}
                    onChangeText={text => setColor(text)}
                />
                <DeviceInput
                    title={'Дата'} placeholder={'Год-месяц-число'}
                    onChangeText={text => setDate(text)}
                />
                <DeviceInput
                    title={'Масса'} placeholder={'Масса в г'}
                    onChangeText={text => setWeight(text)}
                />
                <Button title={'Добавить телефон'} color={'#007AFF'} onPress={() => createItem('phone',
                    {
                        brand,
                        title,
                        ram,
                        rom,
                        gpu,
                        os,
                        display,
                        processor,
                        price: Number(price),
                        dimensions,
                        color,
                        date,
                        weight: Number(weight)
                    }
                )} />
            </View>
            case 'pc': return <View>
                <DeviceInput
                    title={'Название'} placeholder={'Название'}
                    onChangeText={text => setTitle(text)}
                />
                <MainPicker
                    model={'pc_brand'}
                    title={'Бренд'}
                    setParam={setBrand}
                    selectedValue={selectedValue}
                />
                <MainPicker
                    model={'pc_gpu'}
                    title={'Графический процессор'}
                    setParam={setGpu}
                    selectedValue={selectedValue}
                />

                <MainPicker
                    model={'pc_ram'}
                    title={'Оперативная память'}
                    setParam={setRam}
                    selectedValue={selectedValue}
                />
                <MainPicker
                    model={'pc_rom'}
                    title={'Память'}
                    setParam={setRom}
                    selectedValue={selectedValue}
                />
                <MainPicker
                    model={'pc_os'}
                    title={'Операционная система'}
                    setParam={setOS}
                    selectedValue={selectedValue}
                />
                <MainPicker
                    model={'pc_type'}
                    title={'Тип'}
                    setParam={setPcType}
                    selectedValue={selectedValue}
                />
                <DeviceInput
                    title={'Цена'} placeholder={'Сумма'}
                    onChangeText={text => setPrice(text)}
                />
                <DeviceInput
                    title={'Габаритные размеры'} placeholder={'Размеры в мм'}
                    onChangeText={text => setDimensions(text)}
                />
                <DeviceInput
                    title={'Цвет'} placeholder={'Цвет'}
                    onChangeText={text => setColor(text)}
                />
                <DeviceInput
                    title={'Дата'} placeholder={'Год-месяц-число'}
                    onChangeText={text => setDate(text)}
                />
                <DeviceInput
                    title={'Масса'} placeholder={'Масса в г'}
                    onChangeText={text => setWeight(text)}
                />
                <Button title={'Добавить компьютер'} color={'#007AFF'} onPress={() => createItem('pc',
                    {
                        brand,
                        title,
                        ram,
                        rom,
                        gpu,
                        os,
                        display,
                        processor,
                        price: Number(price),
                        dimensions,
                        color,
                        date,
                        weight: Number(weight),
                        type: pcType
                    }
                )} />

            </View>
            case 'camera': return <View>
                <DeviceInput
                    title={'Название'} placeholder={'Название'}
                    onChangeText={text => setTitle(text)}
                />
                <MainPicker
                    model={'camera_brand'}
                    title={'Бренд'}
                    setParam={setBrand}
                    selectedValue={selectedValue}
                />
                <MainPicker
                    model={'matrix'}
                    title={'Тип подключения'}
                    setParam={setMatrix}
                    selectedValue={selectedValue}
                />
                <DeviceInput
                    title={'Цена'} placeholder={'Сумма'}
                    onChangeText={text => setPrice(text)}
                />
                <DeviceInput
                    title={'Габаритные размеры'} placeholder={'Размеры в мм'}
                    onChangeText={text => setDimensions(text)}
                />
                <DeviceInput
                    title={'Цвет'} placeholder={'Цвет'}
                    onChangeText={text => setColor(text)}
                />
                <DeviceInput
                    title={'Дата'} placeholder={'Год-месяц-число'}
                    onChangeText={text => setDate(text)}
                />
                <Button title={'Добавить камеру'} color={'#007AFF'} onPress={() => createItem('camera',
                    {
                        brand,
                        title,
                        price: Number(price),
                        dimensions,
                        color,
                        date,
                        matrix: matrix
                    }
                )} />
            </View>
            case 'tv': return <View>
                <DeviceInput
                    title={'Название'} placeholder={'Название'}
                    onChangeText={text => setTitle(text)}
                />
                <MainPicker
                    model={'tv_brand'}
                    title={'Бренд'}
                    setParam={setBrand}
                    selectedValue={selectedValue}
                />
                <MainPicker
                    model={'tv_connection'}
                    title={'Тип подключения'}
                    setParam={setConnectionType}
                    selectedValue={selectedValue}
                />
                <MainPicker
                    model={'display'}
                    title={'Дисплей'}
                    setParam={setDisplay}
                    selectedValue={selectedValue}
                />
                <DeviceInput
                    title={'Цена'} placeholder={'Сумма'}
                    onChangeText={text => setPrice(text)}
                />
                <DeviceInput
                    title={'Габаритные размеры'} placeholder={'Размеры в мм'}
                    onChangeText={text => setDimensions(text)}
                />
                <DeviceInput
                    title={'Цвет'} placeholder={'Цвет'}
                    onChangeText={text => setColor(text)}
                />
                <DeviceInput
                    title={'Дата'} placeholder={'Год-месяц-число'}
                    onChangeText={text => setDate(text)}
                />
                <Button title={'Добавить телевизор'} color={'#007AFF'} onPress={() => createItem('tv',
                    {
                        brand,
                        title,
                        price: Number(price),
                        dimensions,
                        color,
                        date,
                        connection_type: connectionType,
                        display: display
                    }
                )} />
            </View>
            case 'accessories': return <View>
                <DeviceInput
                    title={'Название'} placeholder={'Название'}
                    onChangeText={text => setTitle(text)}
                />
                <MainPicker
                    model={'accessories_brand'}
                    title={'Бренд'}
                    setParam={setBrand}
                    selectedValue={selectedValue}
                />
                <MainPicker
                    model={'accessories_type'}
                    title={'Тип'}
                    setParam={setAcType}
                    selectedValue={selectedValue}
                />
                <DeviceInput
                    title={'Цена'} placeholder={'Сумма'}
                    onChangeText={text => setPrice(text)}
                />
                <DeviceInput
                    title={'Габаритные размеры'} placeholder={'Размеры в мм'}
                    onChangeText={text => setDimensions(text)}
                />
                <DeviceInput
                    title={'Цвет'} placeholder={'Цвет'}
                    onChangeText={text => setColor(text)}
                />
                <DeviceInput
                    title={'Дата'} placeholder={'Год-месяц-число'}
                    onChangeText={text => setDate(text)}
                />
                <Button title={'Добавить аксессуар'} color={'#007AFF'} onPress={() => createItem('accessories',
                    {
                        brand,
                        title,
                        price: Number(price),
                        dimensions,
                        color,
                        date,
                        type: acType
                    }
                )} />
            </View>
        }


    }

    return (
        <Modal

            visible={visibleAdd}
            animationType='slide'
        >
            <ScrollView
            >
                <View style={{ marginTop: 16 }} >
                    <Button title={'Назад'} onPress={() => setVisibleAdd(false)} color={'#121212'} />
                </View>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Телефон" value="phone" />
                        <Picker.Item label="Компьютер" value="pc" />
                        <Picker.Item label="Камера" value="camera" />
                        <Picker.Item label="Телевизор" value="tv" />
                        <Picker.Item label="Аксессуар" value="accessories" />

                    </Picker>
                </View>

                <View>
                    {selector(selectedValue)}
                </View>


            </ScrollView>
        </Modal>
    )
}