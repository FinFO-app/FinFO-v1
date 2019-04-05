import React, {Component} from 'react';
import {Dimensions, ScrollView, FlatList, Text, RefreshControl, View} from 'react-native';
import {List, Title, CardDetail} from "../containers";
import {CardList} from "./index";
import {API_HOME} from "../screens/home";
import {tabDataLoaded, loadingTabData, playlistLoad} from "../actions";
import {notification} from "../actions/notfication";
import {loadSavedTabData} from "../actions/cacheSystem";

export default class TabBodyRenderer extends Component<Props> {

    state = {
        refreshing: false,
    };

    loadTabsData(title) {
        let path = API_HOME + title + "/";
        console.log("Path", path);
        
        return fetch(API_HOME + title + "/")
            .then((response) => response.json())
            .then((data) => {
                this.props.dispatch(tabDataLoaded(title, data));
            })
            .catch((error) => {
                console.log("Tab Data loading Error", error);
                if (this.props.data)
                    this.props.dispatch(tabDataLoaded(title, this.props.data));
                notification({
                    title: `Unable To Load,`,
                    message: `Are you on network`,
                    alertType: "error",
                })
            });
    }

    _onRefresh = (title) => {

        this.props.dispatch(loadingTabData(title));
        this.loadTabsData(title)
    };

    componentDidMount() {
        // this.loadTabsData(this.props.title);
        const title = this.props.title;
        const dispatch = this.props.dispatch;
        const loadTabData = this.loadTabsData.bind(this);

        loadSavedTabData(title)
            .then(data => {
                dispatch(tabDataLoaded(title, data));
            })
            .catch(error => {
                console.log("Tab data Loading ERROR", error);
                loadTabData(title);
            });
    }

    layoutRender(item, index, tabTitle) {

        const {type, title, data} = {...item};

        const cards = () => {
            switch (type) {
                case "cardDetail":
                    return (
                        <View>
                            {data.map((item, index) => <CardDetail news={item} key={item.title} tabTitle={tabTitle}/>)}
                        </View>
                    );
                case "cardList":
                    return <View><CardList data={data} tabTitle={tabTitle}/></View>;
                case "list":
                    return <List data={data} tabTitle={tabTitle}/>;
                default:
                    return <View/>
            }
        };

        return (
            <View>
                <Title text={title}/>
                {cards()}
            </View>
        );
    }

    render() {

        const {data, title, loading, dispatch} = this.props;

        return (
            <ScrollView
                style={{
                    width: Dimensions.get('window').width
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => {
                            this._onRefresh(title)
                        }}
                    />
                }
                showVerticalScrollIndicator={false}
            >
                {data.map((item, index) => <View key={item.title}>{this.layoutRender(item, index, title)}</View>)}
            </ScrollView>
        );
    }
}
