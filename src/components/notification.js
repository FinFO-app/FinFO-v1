import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';


export default class Notification extends Component<Props> {
    render() {
        return (
            <View style={style.mainView}>

            </View>
        );
    }
}

const style = StyleSheet.create({
    mainView: {
        position: "absolute",
        zIndex: 10,
        elevation: 10,
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: "black"
    }
});
