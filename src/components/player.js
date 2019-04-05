import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {fontSize, padding} from "../utils/defaults";
import MarqueeText from "react-native-marquee";
import SmartImage from "../containers/smartImage";
import Ionicons from "react-native-vector-icons/Ionicons";
import {SourceText} from "../containers";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {toggleAudioState} from "../actions";
import {playAudio} from "../actions/player";


export default class Player extends Component<Props> {

    render() {

        let {theme, data, isPlaying, isLoading, playingId, tabPlaying, dispatch, props} = {...this.props};
        const tab = data[tabPlaying];
        let {title, image, source, datetime, audio,} = {...tab[playingId]};

        let previousButton = <Ionicons name={"ios-skip-backward"} size={30} color={theme.cfg}/>;
        if (tab[playingId - 1]) {
            previousButton = (
                <TouchableOpacity onPress={() => playAudio(tabPlaying, tab[playingId - 1], dispatch)}>
                    <Ionicons name={"ios-skip-backward"} size={30} color={theme.fg}/>
                </TouchableOpacity>
            )
        }

        let nextButton = <Ionicons name={"ios-skip-forward"} size={30} color={theme.cfg}/>;
        if (tab[playingId + 1]) {
            nextButton = (
                <TouchableOpacity onPress={() => playAudio(tabPlaying, tab[playingId + 1], dispatch)}>
                    <Ionicons name={"ios-skip-forward"} size={30} color={theme.fg}/>
                </TouchableOpacity>
            )
        }

        let mainPlayPauseButton = () => {
            const sc = {size: 30, color: theme.fg};
            let icon = null;
            if (audio)
                icon = isLoading ? <EvilIcons name={"spinner"} {...sc}/> :
                    <Ionicons name={isPlaying ? "ios-pause" : "ios-play"} {...sc}/>;
            else
                icon = <Ionicons name={isPlaying ? "ios-pause" : "ios-play"} size={30} color={theme.cfg}/>
            return <TouchableOpacity
                onPress={() => dispatch(toggleAudioState())}>{icon}</TouchableOpacity>
        };

        return (
            <View style={[style.mainContainer, {
                backgroundColor: theme.bg, borderTopColor: theme.cfg + "77",
                borderTopWidth: 0.3
            }]}>
                <View style={style.details}>
                    <View>
                        <SmartImage image={image} height={40}
                                    width={40}/>
                    </View>
                    <View style={{flex: 1, marginLeft: padding.normal, justifyContent: "space-around"}}>
                        <MarqueeText
                            style={{fontSize: fontSize.med, backgroundColor: theme.bg}}
                            duration={3000}
                            marqueeOnStart
                            loop
                            marqueeDelay={5000}
                            marqueeResetDelay={5000}
                            useNativeDriver
                        >
                            {title}
                        </MarqueeText>
                        <SourceText source={source} timestamp={datetime}/>
                    </View>
                </View>
                <View style={style.controls}>

                    {/*<FontAwesome name={"hands-helping"} size={30} color={theme.cfg}/>*/}

                    {/*<View style={{*/}
                        {/*// backgroundColor: theme.cbg,*/}
                        {/*borderRadius: 5,*/}
                        {/*backgroundColor: theme.cbg,*/}
                        {/*padding: padding.small,*/}
                    {/*}}>*/}
                        {/*<Text style={{*/}
                            {/*fontSize: fontSize.normal,*/}
                        {/*}}>*/}
                            {/*1x*/}
                        {/*</Text>*/}
                    {/*</View>*/}

                    {previousButton}
                    {mainPlayPauseButton()}
                    {nextButton}

                    {/*<TouchableOpacity onPress={() => this.props.navigate("MODAL")}>*/}
                        {/*<Ionicons name={"ios-funnel"} size={30} color={theme.fg}/>*/}
                    {/*</TouchableOpacity>*/}

                    {/*<Ionicons name={"ios-open"} size={30} color={theme.fg}/>*/}

                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({

    details: {
        flexDirection: "row",
        alignItems: "center",
        padding: padding.small
    },

    controls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: padding.small,
        // paddingBottom: padding.
    }

});
