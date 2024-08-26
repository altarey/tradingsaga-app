import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './app/App';

//Registered Global Exception Handler
// Registered App Root Component
AppRegistry.registerComponent(appName, () => App);
