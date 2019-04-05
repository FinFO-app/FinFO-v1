/**
 * @author Faisal Manzer
 * @class Home
 *
 * This is main screen of the App.
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from "react-redux";
import {Header, TabBody, TopLogo, Player} from "../containers"
import {tabLoaded} from "../actions";
import Sound from "react-native-sound";
import {MessageBarManager, MessageBar} from "react-native-message-bar";
import {saveSettings} from "../actions/settings";
import MetroProgress from "../components/metroProgress";
import SplashScreen from 'react-native-splash-screen'

// Main api url.
export const API_HOME = "https://api.finfo.xyz/";

class Home extends Component<Props> {

    static navigationOptions = {
        header: null
    };


    loadTabs() {

        // Loading tabs from server.
        // Tabs were removed because of some issues related to business ideology.
        //
        // fetch(API_HOME + "tabs/")
        //     .then((response) => response.json())
        //     .then((tabs) => {
        //
        //     })
        //     .catch((error) => {
        //         alert(error)
        //     });

        // Dispatching tabs without connecting to server.
        this.props.dispatch(tabLoaded(["TODAY"]));
    }

    componentDidMount() {
        // Load all tabs.
        this.loadTabs();

        // Required for iOS, for no mix background play.
        // https://github.com/zmxv/react-native-sound/wiki/API#soundsetcategoryvalue-mixwithothers-ios-only
        Sound.setCategory("Playback", false);

        // registration for in-app message bar
        MessageBarManager.registerMessageBar(this.refs.alert);

        // Hide the Splash screen.
        // https://github.com/crazycodeboy/react-native-splash-screen#usage
        SplashScreen.hide();
    }

    componentWillUnmount() {
        // Remove the alert located on this master page from the manager
        MessageBarManager.unregisterMessageBar();

        // Save updated setting to storage
        saveSettings();
    }

    render() {
        return (
            <View style={{flex: 1}}>

                {/* Head */}
                <View>
                    <Header>
                        <TopLogo/>
                        <MetroProgress/>

                        {/*<TabHeader/>*/}
                    </Header>
                </View>

                {/* Body */}
                <View style={{flex: 1}}>
                    <TabBody/>
                    <Player navigate={this.props.navigation.navigate}/>
                </View>

                {/* Message Bar component */}
                <MessageBar ref={"alert"}/>
            </View>
        );
    }
}

// Connect to redux
export default connect()(Home)
