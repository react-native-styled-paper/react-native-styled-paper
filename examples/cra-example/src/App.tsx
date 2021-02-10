import * as React from 'react';
import { ThemeProvider } from "styled-components";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LightTheme from "react-native-styled-paper/components/theme/LightTheme";
import { ToastProvider } from 'react-native-styled-paper/components/Toast';
import { Viewport } from "react-native-styled-paper/components/Container";
import './App.css';

import { HomePage } from './pages/home/HomePage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { SettingPage } from './pages/setting/SettingPage';

function SplashScreen() {
    return (
        <div>
            Loading...
        </div>
    )
}

const linking = {
    prefixes: ['https://mychat.com', 'mychat://'],
    config: {
        screens: {
            Home: '',
            Profile: ':id/profile',
            Setting: ':id/blog',
        }
    },
};

const Stack = createStackNavigator();

function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <ToastProvider>
                <Viewport>
                    <NavigationContainer linking={linking} fallback={<SplashScreen />}>
                        <Stack.Navigator>
                            <Stack.Screen name="Home" component={HomePage} />
                            <Stack.Screen name="Profile" component={ProfilePage} />
                            <Stack.Screen name="Setting" component={SettingPage} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </Viewport>
            </ToastProvider>
        </ThemeProvider>
    );
}

export default App;
