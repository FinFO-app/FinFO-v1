import React, {Component} from 'react';
import {View, Dimensions, Text, TouchableWithoutFeedback} from 'react-native';
import {fontSize, padding} from "../utils/defaults";
import {SmartImage, SourceText} from "../containers";
import {playAudio} from "../actions/player";
// import Title from "./title";


export default class CardDetail extends Component<Props> {
    render() {

        const {theme, news, tabTitle, dispatch} = {...this.props};

        const {source, title, datetime, image} = {...news};

        const IMAGE_WIDTH = Dimensions.get('window').width;
        const IMAGE_HEIGHT = IMAGE_WIDTH * 2 / 3;

        return (
            <TouchableWithoutFeedback onPress={() => {
                playAudio(tabTitle, news, dispatch)
            }}>

                <View style={{
                    backgroundColor: theme.bg,
                    borderColor: theme.cfg + "44",
                    borderWidth: 0.5,
                    marginBottom: padding.large
                }}>
                    <SmartImage width={IMAGE_WIDTH} height={IMAGE_HEIGHT} image={image}/>
                    <View style={{padding: padding.normal}}>
                        <Text style={{fontSize: fontSize.med, fontWeight: "500", color: theme.fg}}>
                            {title}
                        </Text>
                        <SourceText source={source} timestamp={datetime}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
