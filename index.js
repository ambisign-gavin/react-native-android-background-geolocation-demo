// @flow
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import LocationService from 'react-native-android-location-service';

LocationService.onLocationChanged(({coords}) => {
    //do something, like update data
    console.log(coords)
});

AppRegistry.registerComponent(appName, () => App);
