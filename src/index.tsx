import { NavigationContainer, DarkTheme, Theme } from '@react-navigation/native';
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

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

const App = () => {
    return (
        <NavigationContainer theme={appTheme}>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name='Home' component={Home} options={{ title: 'Chess' }} />
                <Stack.Screen name='Game' component={Game} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
