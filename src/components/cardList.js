import React, {Component} from 'react';
import {ScrollView, Dimensions, Platform} from 'react-native';
import {Card} from '../containers';


export default class CardList extends Component<Props> {

    componentDidMount() {
        // setTimeout(() => {
        //     this.scrollView.scrollTo({x: -30})
        // }, 500) // scroll view position fix
    }

    render() {

        const {data, tabTitle} = {...this.props};
        const WIDTH = Dimensions.get('window').width;

        const scrollHack = Platform.OS === "ios" ? {} : {
            contentContainerStyle: {flexGrow: 1},
            // pagingEnabled: true
            decelerationRate: 0,
            snapToInterval: WIDTH - 60,
            snapToAlignment: "center",
            contentInset: {
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
            }
        };

        return (
            <ScrollView
                ref={(scrollView) => {
                    this.scrollView = scrollView;
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                {...scrollHack}
            >
                {
                    data.map(item => <Card news={item} key={item.title} width={WIDTH - 80} tabTitle={tabTitle} />)
                }
            </ScrollView>
        );
    }
}
