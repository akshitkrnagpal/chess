import { AppRegistry, Platform } from 'react-native';
import App from './src/index';

AppRegistry.registerComponent('chess', () => App);

if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root');
    AppRegistry.runApplication('chess', { rootTag });
}
