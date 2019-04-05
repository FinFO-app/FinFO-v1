import React, {Component} from 'react';
import {FlatList, Platform} from 'react-native';
import {addTabBodyRef, tabBodyScrolling} from "../actions";
import {TabBodyRenderer} from "../containers";

export default class TabBody extends Component<Props> {


    render() {

        const {data, dispatch} = {...this.props};

        // TODO: Fix bug of scrolling in Android

        return (
            <FlatList
                ref={(c) => {dispatch(addTabBodyRef(c))}}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => <TabBodyRenderer {...item}/>}
                horizontal={true}
                scrollEnabled={false}
                pagingEnabled={true}
                onScroll={(event: Object) => {
                    const offset = event.nativeEvent.contentOffset.x;
                    dispatch(tabBodyScrolling(offset))
                }}
                showsHorizontalScrollIndicator={false}
            />
        );
    }
}
