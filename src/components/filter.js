import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {fontSize, padding} from "../utils/defaults";
import {connect} from "react-redux";
import {toggleCategoryFilter} from "../actions";

class FilterTextComp extends Component<Props> {

    render() {

        const {visible, label, onPress, theme, categories} = {...this.props};

        const opacity = visible ? "" : "3";

        return (
            <TouchableOpacity onPress={onPress}>
                <Text style={[style.text, {
                    color: theme.fg + opacity,
                    textDecorationLine: visible ? 'none' : 'line-through'
                }]}>
                    {label}
                </Text>
            </TouchableOpacity>
        )
    }
}


const FilterText = connect((state) => {
    return {
        theme: state.theme.colors,
        categories: state.settings.categories
    }
})(FilterTextComp);


export default class Filter extends Component<Props> {

    componentWillMount() {
        this.props.dispatch({
            type: "RELOAD_SETTINGS"
        })
    }

    render() {

        const {categories, dispatch} = {...this.props};

        return (
            <View>
                {/*<FilterText label={"ALL"} visible={true} onPress={() => {*/}
                    {/*dispatch({*/}
                        {/*type: "TOGGLE_ALL_CATEGORIES"*/}
                    {/*});*/}
                    {/*this.forceUpdate();*/}
                {/*}}/>*/}

                {
                    Object.keys(categories).map(key => {
                        return <FilterText
                            key={key}
                            label={key}
                            visible={categories[key]}
                            onPress={() => {
                                dispatch(toggleCategoryFilter(key));
                                this.forceUpdate();
                            }}
                        />
                    })
                }

            </View>
        );
    }
}


const style = StyleSheet.create({
    text: {
        fontSize: fontSize.med,
        marginHorizontal: padding.normal
    }
});
