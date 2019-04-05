import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Header} from "../containers";
import {Title} from "../containers";
import {connect} from "react-redux";
import {fontSize, padding} from "../utils/defaults";
import {Filter} from "../containers";


class CategorySelection extends Component<Props> {

    render() {

        let {theme, navigation} = {...this.props};

        return (
            <View style={{flex: 1, backgroundColor: theme.bg}}>
                <Header noseperator/>
                <Title text={"Categories"}/>
                <View style={style.mainBody}>
                    <Filter/>
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={[{backgroundColor: theme.cbg}, style.button]}>
                        <Text style={{color: theme.fg}}>DONE</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}


const style = StyleSheet.create({
    button: {
        padding: padding.normal,
        margin: padding.normal,
        alignItems: 'center'
    },
    mainBody: {
        padding: padding.normal
    },
    text: {
        fontSize: fontSize.med,
        marginHorizontal: padding.normal
    },
    selector: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginVertical: padding.small
    }
});


function mapStateToProps(state) {
    return {
        theme: state.theme.colors,
        categories: state.settings.categories
    }
}


export default connect(mapStateToProps)(CategorySelection);
