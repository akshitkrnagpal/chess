import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Game from './screens/Game';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

const AppTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: 'rgb(255, 255, 255)',
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
                        backgroundColor: 'rgb(48, 46, 43)',
                    },
                }}
            >
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{ title: 'Chess' }}
                />
                <Stack.Screen name='Game' component={Game} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
