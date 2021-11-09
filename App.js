import { StatusBar } from 'expo-status-bar';
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
import Main from './Main';
import { Start } from './Start';
import { AppContext } from './context';


const AuthStack = createStackNavigator();

export default function App() {

  const getTokenFromStorage = async () => {
    console.log('============get token  from sotarge==============')
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.log(value);
        return value
      }
    } catch (error) {
      alert("не удалось получить токен")
    }
    console.log('===============================================')
  }

  return (
    <AppContext.Provider value={{ getTokenFromStorage }}>
      <NavigationContainer
        independent={true}
      >
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >

          <AuthStack.Screen
            name='Start'
            component={Start}

          />


          <AuthStack.Screen
            name='Main'
            component={Main}
          />



        </AuthStack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}