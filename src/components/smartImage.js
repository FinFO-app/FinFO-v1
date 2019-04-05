import React, {Component} from 'react';
import {View, ImageBackground, Image, StyleSheet} from 'react-native';


export default class SmartImage extends Component<Props> {
    render() {

        const {width, height, image, placeHolderImage, imageStyle} = {...this.props};

        const imageDimensions = {
            height: height,
            width: width
        };

        return (
            <View style={[style.imageHolder, imageDimensions, imageStyle]}>
                <ImageBackground source={placeHolderImage} style={imageDimensions}>
                    <Image source={{uri: image}} style={[style.image, imageDimensions]}/>
                </ImageBackground>
            </View>
        );
    }
}

const style = StyleSheet.create({
    imageHolder: {
        overflow: 'hidden',
        position: "relative",
    },
    image: {
        // flex: 1,
        resizeMode: "cover",
    },
});
