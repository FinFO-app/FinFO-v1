import React, {Component} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import {addTabHeaderRef, saveTabHeaderTextWidth, tabChanged} from "../actions";
import {fontSize, padding} from "../utils/defaults";

// TODO: you can calculate exact things

export default class TabHeader extends Component<Props> {

    render() {

        const {tabs, dispatch, activeTabIndex, theme} = {...this.props};

        return (
            <ScrollView
                horizontal={true}
                vertical={false}
                showsHorizontalScrollIndicator={false}
                ref={(c) => {dispatch(addTabHeaderRef(c))}}
                bounces={false}
            >
                {
                    tabs.map((tab, index) => {

                        const isActive = activeTabIndex === index;

                        return (
                            <TouchableWithoutFeedback key={index.toString()} onPress={() => {dispatch(tabChanged(index))}}>
                                <View
                                    style={{
                                        borderBottomWidth: isActive ? 3 : 0,
                                        borderColor: theme.fg
                                    }}
                                >
                                    <Text style={{
                                        color: theme.fg,
                                        opacity: isActive ? 1 : 0.7,
                                        fontSize: fontSize.med,
                                        padding: padding.normal
                                    }}

                                          onLayout={event => {
                                              dispatch(saveTabHeaderTextWidth(index, event.nativeEvent.layout.width));
                                          }}

                                    >
                                        {tab.title.toUpperCase()}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        );
    }
}
