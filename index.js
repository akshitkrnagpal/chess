import { registerRootComponent } from 'expo';
import Constants from 'expo-constants';
import * as Sentry from 'sentry-expo';

import App from './src/index';

Sentry.init({
    dsn: Constants.manifest.extra.SENTRY_DSN,
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
