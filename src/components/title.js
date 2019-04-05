import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {fontSize, padding} from "../utils/defaults";
import {theme} from "../reducers/theme";


export default class Title extends Component<Props> {
    render() {
        return (
                <Text style={{margin: padding.normal, fontSize: fontSize.large, fontWeight: "700", color: this.props.theme.fg}}>
                    {this.props.text}
                </Text>
        );
    }
}
