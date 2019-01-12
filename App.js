// @flow
import React, {Component} from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, TouchableOpacity } from 'react-native';
import LocationService, { PriorityModeEnum } from 'react-native-android-background-geolocation';

export default class App extends Component<{}> {

    async componentDidMount() {
        // 1. Request permissions
        await this._requestLocationPermission();

        // 2. Register a event listener by OnError and onLocationChanged
        LocationService.onError(({code, message}) => {
            console.log('error code', code);
            console.log('error message', message);
        });

        LocationService.onLocationChanged(({coords}) => console.log('coords', coords));
    }

    componentWillUnmount() {
        // 3. Remove All listeners
        LocationService.removeAllListeners();
    }

    async _requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'App Location Permission',
                    'message': 'Just for test.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted.');
            } else {
                console.log('Location permission denied.');
            }
        } catch (error) {
            console.warn(error);
        }
    }
    
    _startGeolocationService() {
        LocationService.start({
            priority: PriorityModeEnum.PRIORITY_HIGH_ACCURACY,
            stopOnTerminate: false,
            interval: 20 * 1000,
            fastestInterval: 15 * 1000,
            distanceFilter: 100,
        });
    }

    _stopGeolocationService() {
        LocationService.stop();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this._startGeolocationService()}
                >
                    <Text style={styles.buttonText} >Start Location Service</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this._stopGeolocationService()}
                >
                    <Text style={styles.buttonText} >Stop Location Service</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        textAlign: 'center',
        backgroundColor: '#4289f4',
        margin: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
    }
});
