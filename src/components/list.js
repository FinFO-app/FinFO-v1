import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {SmartImage, SourceText} from "../containers";
import {fontSize, padding} from "../utils/defaults";
import {playAudio} from "../actions/player";

export default class List extends Component<Props> {
    render() {

        const {theme, dispatch, tabTitle} = {...this.props};

        return (
            <View>
                {
                    this.props.data.map((item, index) => {

                        const {title, image, source, datetime} = {...item};

                        return (
                            <TouchableWithoutFeedback onPress={() => {
                                playAudio(tabTitle, item, dispatch)
                            }}
                                                      key={index.toString()}
                            >

                                <View style={{
                                    borderBottomWidth: 0.5,
                                    borderTopWidth: 0.5,
                                    borderColor: theme.cfg + "33",
                                    flexDirection: 'row',
                                    backgroundColor: theme.bg,
                                }}>
                                    <View style={{
                                        flex: 1,
                                        padding: padding.small,
                                        justifyContent: "space-between"
                                    }}>
                                        <Text style={{fontSize: fontSize.normal, color: theme.fg}}>
                                            {title}
                                        </Text>
                                        <SourceText source={source} timestamp={datetime}/>
                                    </View>
                                    <SmartImage width={120} height={100} image={image}/>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })
                }
            </View>
        );
    }
}
