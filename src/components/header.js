/**
 * @author Faisal Manzer
 * @class Header
 * @extends Component
 *
 *
 * A wrapper for status bar and header components.
 */

import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';

// Package used for getting dynamic statusbar height
import {getStatusBarHeight} from 'react-native-status-bar-height';

// Redux actions
import {statusBarHeightChanged} from "../actions";


type Props = {
    // FROM REDUX STORE
    theme: Object, // Main theme object
    height: number, // Height of iOS statusbar
    hidden: boolean, // To show statusbar,
    dispatch: Function, // Main Function from redux to pass actions

    // Passed on Props
    children: Array<Component>,
    noseperator: boolean, // Add separator below header
}
export default class Header extends Component<Props> {

    componentDidMount() {

        // Set initial iOS statusbar height to store
        // skipAndroid: true [exclude android]
        // https://github.com/ovr/react-native-status-bar-height#usage-getstatusbarheightskipandroid-boolean--false
        this.props.dispatch(statusBarHeightChanged(getStatusBarHeight(true)))
    }


    render() {

        // height, theme and hidden are props from redux store
        const {theme, height, children, hidden, noseperator, props} = {...this.props};

        return (
            <View style={[{backgroundColor: theme.bg}, noseperator ? {} : {
                borderBottomColor: theme.cfg + "77",
                borderBottomWidth: 0.3
            }]}>
                <StatusBar backgroundColor={theme.bg} barStyle={theme.statusBarContent} hidden={hidden}/>

                {/* This is padding from iOS top */}
                <View style={{
                    backgroundColor: theme.bg,
                    height: height
                }}/>

                <View>
                    {children}
                </View>
            </View>
        );
    }
}
