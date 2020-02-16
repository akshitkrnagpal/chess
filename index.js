import 'expo/build/Expo.fx';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { activateKeepAwake } from 'expo-keep-awake';

import app from './app/index';

__DEV__ && activateKeepAwake();

registerRootComponent(app);
