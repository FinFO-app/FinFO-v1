import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import {currentCount, totalCount} from "../actions/player";


export default class MetroProgress extends Component<Props> {

    state = {
        count: 0
    };

    render() {

        setTimeout(() => {
            this.setState({
                count: currentCount
            })
        }, 500);

        if (totalCount && currentCount)
            return (
                <View>
                    <View style={{
                        backgroundColor: "black",
                        height: 2,
                        width: Dimensions.get("window").width * currentCount / totalCount
                    }}/>
                    <View style={{
                        backgroundColor: "#777",
                        height: 2,
                        flex: 1
                    }}/>
                </View>
            );
        else
            return (
                <View/>
            )
    }
}
