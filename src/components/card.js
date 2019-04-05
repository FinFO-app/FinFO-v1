import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions, Platform} from 'react-native';
import {fontSize, padding} from "../utils/defaults";
import {shadow} from "../utils/shadow";
import SourceText from "./sourceText";
import {SmartImage} from "../containers";
import {playAudio} from "../actions/player";

export default class Card extends Component<Props> {

    render() {

        let {theme, width, news, dispatch, tabTitle} = {...this.props};
        const {title, source, datetime, image, audio} = {...news};

        const cardShadow = Platform.OS === "ios" ? shadow(7) : shadow(5);

        if (!width) {
            width = Dimensions.get('window').width - 2 * padding.normal;
        }
        const IMAGE_WIDTH = width;
        const IMAGE_HEIGHT = IMAGE_WIDTH * 2 / 3;

        return (
            <TouchableWithoutFeedback onPress={() => {
                playAudio(tabTitle, news, dispatch)
            }}>
                <View style={style.container}>
                    <View style={[style.card, cardShadow, {backgroundColor: theme.bg, width: width}]}>

                        <SmartImage
                            image={image}
                            width={IMAGE_WIDTH}
                            height={IMAGE_HEIGHT}
                            imageStyle={{
                                borderTopLeftRadius: defaults.border,
                                borderTopRightRadius: defaults.border
                            }}
                        />

                        <View style={style.textContainer}>
                            <Text style={[style.title, {color: theme.fg}]} numberOfLines={3}>
                                {title}
                            </Text>
                            <SourceText source={source} theme={theme} timestamp={datetime}/>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const defaults = {
    border: 15
};

const style = StyleSheet.create({

    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: padding.normal
    },

    card: {
        borderRadius: defaults.border
    },

    textContainer: {
        // flex: 1,
        padding: padding.normal,
    },

    title: {
        fontSize: fontSize.med,
        fontWeight: "500"
    },

    sourceText: {
        fontSize: fontSize.normal
    }
});
