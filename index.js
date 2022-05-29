import { registerRootComponent } from 'expo';
import * as Sentry from 'sentry-expo';
import { SENTRY_DSN } from '@env';

import App from './src/index';

Sentry.init({
    dsn: SENTRY_DSN,
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
