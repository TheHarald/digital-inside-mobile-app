import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accessories } from './screens/accessories';
import { Phones } from './screens/phones';
import { styles } from './styles';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TVS } from './screens/tvs';
import { PCS } from './screens/pcs';
import { Cameras } from './screens/cameras';
import { MainContext } from './context';

const Tab = createBottomTabNavigator();



export default function Main() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            <Tab.Screen

                name={"Phones"}
                component={Phones}
                options={{ title: "Телефоны" }}
            />

            <Tab.Screen
                name={"TVs"}
                component={TVS}
                options={{ title: "Телевизоры" }}
            />

            <Tab.Screen
                name={"PCS"}
                component={PCS}
                options={{ title: "Компьютеры" }}
            />
            <Tab.Screen
                name={"Cameras"}
                component={Cameras}
                options={{ title: "Камеры" }}
            />
            <Tab.Screen
                name={"Accessories"}
                component={Accessories}
                options={{ title: "Аксессуары" }}
            />
        </Tab.Navigator>
    );
}