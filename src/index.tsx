import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Game from './screens/Game';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

const AppTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: '#302e2b',
    },
};

const App = () => {
    return (
        <NavigationContainer theme={AppTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerTitleStyle: {
                        fontFamily: 'Verdana',
                        fontWeight: '600',
                    },
                    headerStyle: {
                        backgroundColor: '#262522',
                    },
                }}
            >
                <Stack.Screen name='Home' component={Home} options={{ title: 'Chess' }} />
                <Stack.Screen name='Game' component={Game} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
