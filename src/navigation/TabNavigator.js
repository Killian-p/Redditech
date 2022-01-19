import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackNavigator, SearchStackNavigator, ProfilStackNavigator } from './StackNavigator';
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={{tabBarHideOnKeyboard: true}}>
            <Tab.Screen name="Home Tab" component={MainStackNavigator} options={{
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}/>
            <Tab.Screen name="Search Tab" component={SearchStackNavigator} options={{
                headerShown: false,
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="search" color={color} size={size} />
                ),
            }}/>
            <Tab.Screen name="Profil Tab" component={ProfilStackNavigator} options={{
                headerShown: false,
                tabBarLabel: 'Profil',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="person" color={color} size={size} />
                    ),
                }}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;