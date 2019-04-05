/**
 * @author Faisal Manzer
 * @class Header
 *
 * Redux wrapper for component.
 */

import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontSize, padding} from '../utils/defaults';
import {settings} from "../actions/settings";
import {clearAllCache} from "../actions/cacheSystem";
import colors from "../utils/colors";

let updateNum = false;

export default class TopLogo extends Component<Props> {

    async update() {
        setTimeout(() => {
            this.forceUpdate();
            updateNum = true;
        }, 500)
    }

    render() {

        const {theme, dispatch, props} = {...this.props};
        const sett = settings();
        const {blue} = {...colors};

        if (!updateNum)
            this.update();

        return (
            <View style={{
                flexDirection: "row",
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: padding.small,
                paddingHorizontal: padding.normal
            }}>
                {/*<Image source={theme.icon} style={{height: 30, width: 30 * 3.21, resizeMode: "cover"}}/>*/}
                {/*<Title text={"TODAY"} />*/}
                <Text style={{fontWeight: "bold", fontSize: fontSize.med, color: theme.fg}}>
                    TODAY
                </Text>
                <TouchableOpacity onPress={() => {
                    if (!sett.metroMode)
                        if (!sett.askedForMetro)
                            Alert.alert(
                                'METRO MODE',
                                'We will offline all the NEWS so that you don\'t get loading in bad networks',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                    },
                                    {
                                        text: 'I AM IN',
                                        onPress: () => {
                                            dispatch({
                                                type: "METRO_MODE_START"
                                            });
                                            this.update();
                                        }
                                    },
                                ],
                                {cancelable: true}
                            );
                        else {
                            dispatch({
                                type: "METRO_MODE_START"
                            });
                            this.update();
                        }

                    else {
                        dispatch({
                            type: "METRO_MODE_CANCEL"
                        });
                        this.update();
                    }
                }}>
                    <Ionicons name={"ios-train"} size={30} color={sett.metroMode ? theme.fg : theme.cfg}/>
                </TouchableOpacity>
                {/*<TouchableOpacity onPress={() => {*/}
                    {/*clearAllCache()*/}
                {/*}}>*/}
                    {/*<Ionicons name={"ios-trash"} size={30} color={theme.fg}/>*/}
                {/*</TouchableOpacity>*/}
            </View>
        );
    }
}
