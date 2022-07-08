import { DarkTheme, NavigationContainer, Theme } from '@react-navigation/native';
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { DripsyProvider, makeTheme } from 'dripsy';

import Game from './screens/Game';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

const appTheme: Theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: '#302e2b',
    },
};

const screenOptions: NativeStackNavigationOptions = {
    headerTitleStyle: {
        fontFamily: 'Verdana',
        fontWeight: '600',
    },
    headerStyle: {
        backgroundColor: '#262522',
    },
};

const theme = makeTheme({});

const App = () => {
    return (
        <DripsyProvider theme={theme}>
            <NavigationContainer theme={appTheme}>
                <Stack.Navigator screenOptions={screenOptions}>
                    <Stack.Screen name='Home' component={Home} options={{ title: 'Chess' }} />
                    <Stack.Screen name='Game' component={Game} />
                </Stack.Navigator>
            </NavigationContainer>
        </DripsyProvider>
    );
};

export default App;
