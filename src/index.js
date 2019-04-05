/**
 * @author Faisal Manzer
 * @class Index
 *
 * Creating stack navigator.
 * [Although navigation is never used in this project. It was a future plan.]
 */

import React from 'react';
import {createStackNavigator} from 'react-navigation';

// Actions
import {loadSettings} from "./actions/settings";
import {clearOldCache} from "./actions/cacheSystem";
import Home from "./screens/home";
import CategorySelection from "./screens/categogySelection";

// Main navigator.
// registers 2 screens.
const Navigator = createStackNavigator({
    'HOME': {screen: Home},

    // Modal is not implemented fully
    'MODAL': {screen: CategorySelection}
}, {
    initialRouteName: 'HOME',

    // To remove default headers on both iOS and Android
    // Remember this is older version of React Navigation.
    headerMode: 'none'
});

export default class Index extends React.Component {

    componentWillMount() {

        // Load setting when Index mounts.
        loadSettings();

        // Remove cache which are greater than 1day
        clearOldCache();

        // To make sure that app is always clean.
        // This is not mandatory
        // React Native Support timeout upto 1min so 1000 milisec * 60
        // Exceeding one min will give you a warning.
        setInterval(() => {
            console.log("Clearing Old Cache");
            clearOldCache()
        }, 1000 * 60);
    }

    render() {
        return (
            <Navigator/>
        );
    }
}
