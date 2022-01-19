
import React from "react";
import { Pressable } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfil from '../components/UserProfil';
import Home from './../components/Home';
import Settings from '../components/Settings';
import Search from '../components/Search';
import SubredditSelected from '../components/SubredditSelected';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setToken, deleteValue } from "./../components/StoringData";
import { useContext } from "react";
import {StoreContext} from './../utils/Context';

const Stack = createStackNavigator();

function MainStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Feed" component={Home}/>
        </Stack.Navigator>
    )
}

function SearchStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={Search}/>
            <Stack.Screen name="SubredditSelected" component={SubredditSelected} options={({ route }) => ({ title: route.params.name})}/>
        </Stack.Navigator>
    )
}

function ProfilStackNavigator() {
    const { setIsAuthenticated } = useContext(StoreContext);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Profil" component={UserProfil} options={{headerShown: false}}/>
            <Stack.Screen name="Settings" component={Settings}
                options={{
                    headerRight: () => (
                        <Pressable onPress={() => {
                            deleteValue('access_token');
                            deleteValue('refresh_token');
                            setToken('isAuthenticated', JSON.stringify(false));
                            deleteValue('tokenCreation');
                            setIsAuthenticated(false)
                        }}>
                            <MaterialCommunityIcons name="logout" size={30}/>
                        </Pressable>
                    ),
                }}
            />
        </Stack.Navigator>
    )
}

module.exports = {
    MainStackNavigator,
    SearchStackNavigator,
    ProfilStackNavigator
}