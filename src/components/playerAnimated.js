// import React, {Component} from 'react';
// // import {SmartImage, SourceText} from "../containers";
// import {View, Animated, StyleSheet, Text, Dimensions, TouchableWithoutFeedback} from 'react-native';
// import Ionicons from "react-native-vector-icons/Ionicons";
// import EvilIcons from "react-native-vector-icons/EvilIcons";
// import FontAwesome from "react-native-vector-icons/FontAwesome5";
// import {fontSize, padding} from "../utils/defaults";
// import {Title, SourceText} from "../containers";
// import {toggleAudioState} from "../actions";
//
// let SCREEN_HEIGHT = Dimensions.get("window").height;
// let SCREEN_WIDTH = Dimensions.get("window").width;
//
// let superImageHeight = SCREEN_WIDTH * 2 / 3;
//
// export default class Player extends Component<Props> {
//
//     state = {
//         isActive: false
//     };
//
//     componentWillMount() {
//         this.animation = new Animated.Value(50);
//         SCREEN_HEIGHT -= this.props.statusBarHeight
//     }
//
//     animate() {
//
//         Animated.timing(this.animation, {
//             toValue: this.state.isActive ? 50 : SCREEN_HEIGHT,
//             duration: 300,
//         }).start();
//
//         this.setState({
//             isActive: !this.state.isActive
//         })
//
//     }
//
//     render() {
//
//         let {theme, data, isPlaying, isLoading, playingId, tabPlaying, dispatch, props} = {...this.props};
//
//         let playingNow = data[tabPlaying][playingId];
//
//         let opacity = this.animation.interpolate({
//             inputRange: [50, SCREEN_HEIGHT],
//             outputRange: [1, 0]
//         });
//
//         let mainContainerHeight = this.animation.interpolate({
//             inputRange: [50, SCREEN_HEIGHT],
//             outputRange: [50, SCREEN_HEIGHT]
//         });
//
//         let imageWidth = this.animation.interpolate({
//             inputRange: [30, SCREEN_HEIGHT],
//             outputRange: [30, SCREEN_WIDTH]
//         });
//
//         let imageHeight = this.animation.interpolate({
//             inputRange: [50, SCREEN_HEIGHT],
//             outputRange: [30, superImageHeight]
//         });
//
//         let imagePadding = this.animation.interpolate({
//             inputRange: [50, SCREEN_HEIGHT],
//             outputRange: [10, 0]
//         });
//
//         let topBorderWidth = this.animation.interpolate({
//             inputRange: [50, SCREEN_HEIGHT],
//             outputRange: [0.3, 0]
//         });
//
//         let mainPlayPauseButton = () => {
//             const sc = {size: 30, color: theme.fg};
//             const icon = isLoading ? <EvilIcons name={"spinner"} {...sc}/> :
//                 <Ionicons name={isPlaying ? "ios-pause" : "ios-play"} {...sc}/>;
//             return <TouchableWithoutFeedback
//                 onPress={() => dispatch(toggleAudioState())}>{icon}</TouchableWithoutFeedback>
//         };
//
//         return (
//             <Animated.View style={[style.mainContainer, {
//                 backgroundColor: theme.bg,
//                 height: mainContainerHeight,
//                 borderTopColor: theme.cfg + "77",
//                 borderTopWidth: topBorderWidth
//             }]}>
//
//                 {/* This is the MAIN Visible Player */}
//                 <Animated.View style={[style.imageContainer, {padding: imagePadding}]}>
//
//                     {/*
//                         Thumbnail image
//                         Expand to all screen
//                      */}
//                     <TouchableWithoutFeedback onPress={() => {
//                         this.animate()
//                     }}>
//                         <Animated.Image source={playingNow.image ? {uri: playingNow.image} : theme.placeHolderImage}
//                                         style={{height: imageHeight, width: imageWidth}}/>
//                     </TouchableWithoutFeedback>
//
//                     {/* control WILL HIDE */}
//                     <Animated.View style={[style.titleControls, {opacity: opacity}]}>
//
//                         {/* Player Title WILL HIDE */}
//                         <TouchableWithoutFeedback onPress={() => {
//                             this.animate()
//                         }} style={style.controlTitle}>
//                             <Text style={{fontSize: fontSize.med}}>
//                                 {playingNow.title}
//                             </Text>
//                         </TouchableWithoutFeedback>
//
//                         {mainPlayPauseButton()}
//                         <Ionicons name={"ios-skip-forward"} size={30} style={style.iconPadding}/>
//
//                     </Animated.View>
//
//                 </Animated.View>
//
//                 {/* The Hidden View */}
//
//                 <Animated.View
//                     style={{opacity: 1 - opacity, flex: 1, justifyContent: "space-between", width: SCREEN_WIDTH}}>
//
//                     {/* Detail View */}
//                     <View>
//
//                         {/* Title Centered */}
//                         <Title text={playingNow.title}/>
//
//                         {/* Source Link */}
//                         <SourceText timestamp={playingNow.timeStamp} source={playingNow.source}/>
//                         <Text>
//                             isLoading: {isLoading ? "yes" : "no"},
//                             isPlaying: {isPlaying ? "yes" : "no"},
//                         </Text>
//
//                     </View>
//
//                     {/* Player Main */}
//                     <View style={{
//                         height: 50,
//                         flexDirection: 'row',
//                         justifyContent: 'space-around',
//                         alignItems: 'center',
//                         borderTopWidth: 1,
//                         borderColor: theme.cbg,
//                         backgroundColor: theme.bg
//                     }}>
//                         <Text style={{backgroundColor: theme.cbg, fontSize: 20, padding: 5}}>
//                             1x
//                         </Text>
//                         <Ionicons name={"ios-skip-backward"} size={30} color={theme.fg}/>
//                         {mainPlayPauseButton()}
//                         <Ionicons name={"ios-skip-forward"} size={30} color={theme.fg}/>
//                         <FontAwesome name={"hands-helping"} size={30} color={theme.cfg}/>
//                     </View>
//
//                 </Animated.View>
//
//             </Animated.View>
//         );
//     }
// }
//
//
// const style = StyleSheet.create({
//
//     mainContainer: {
//         zIndex: 10,
//         elevation: 10,
//         position: "absolute",
//         left: 0,
//         right: 0,
//         bottom: 0,
//         alignItems: "center",
//     },
//
//     imageContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         width: SCREEN_WIDTH,
//     },
//
//     titleControls: {
//         flexDirection: "row",
//         flex: 1,
//         justifyContent: "space-between"
//     },
//
//     iconPadding: {
//         paddingHorizontal: padding.normal
//     },
//
//     controlTitle: {
//         flex: 1,
//         paddingHorizontal: padding.normal,
//         justifyContent: "center"
//     }
//
// });
