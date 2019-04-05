import React, {Component} from 'react';
import {View, Text} from 'react-native';
import relativeTime, {isValidDate} from "../utils/relativeTime";
import {fontSize} from "../utils/defaults";


export default class SourceText extends Component<Props> {
    render() {
        const {source, timestamp, theme, props} = {...this.props};


        const trueDate = timestamp? isValidDate(timestamp): false;

        const separator = (trueDate && source) ? " - " : "";

        const relativeDate = trueDate? relativeTime(trueDate): "";

        return (
            <View>
                <Text
                    style={{color: theme.cfg, fontSize: fontSize.normal}}
                    {...props}
                >{source}{separator}{relativeDate}</Text>
            </View>
        );
    }
}
