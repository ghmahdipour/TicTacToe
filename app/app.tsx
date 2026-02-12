import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types/navigation.type';
import { store } from './store';
import { useAppStateMusic } from './hooks';
import { routes } from './constants/routes';

const Stack = createStackNavigator<RootStackParamList>();

export const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export const App = () => {
    useAppStateMusic();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                <Stack.Screen name='Splash' component={routes.Splash} options={{headerShown: false}} />
                <Stack.Screen name='Home' component={routes.Home} options={{headerShown: false}} />
                <Stack.Screen name='Level' component={routes.Level} options={{headerShown: false}} />
                <Stack.Screen name='Board' component={routes.Board} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppWrapper;
