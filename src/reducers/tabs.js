import store from "../stores/tabs";
import {Dimensions} from "react-native";
import {saveTabData} from "../actions/cacheSystem";
import {settings} from "../actions/settings";

export async function reloadCategories(data) {

    let settingsObj = settings();

    data.map(card => {
        card.data.map(news => {
            news.categories.map(category => {
                if (!settingsObj.categories[category]) {
                    settingsObj.categories[category] = true
                }
            })
        })
    });

    settings(settingsObj, true);
}

export const tabs = (state = store, action) => {

    switch (action.type) {

        case 'TAB_LOADED': {
            let tabs = [];

            action.tabs.map(tab => {
                tabs.push({
                    "title": tab,
                    "loading": true,
                    "data": []
                })
            });

            return {...state, tabs: tabs};
        }


        case 'TAB_DATA_LOADED': {

            saveTabData(action.title, action.data);

            let tabs = [];
            state.tabs.map((item, index) => {
                if (item.title === action.title) {
                    item.data = action.data;
                    item.loading = false;
                }

                tabs.push(item)
            });

            reloadCategories(action.data);

            return {
                ...state,
                tabs: tabs,
            };
        }

        case 'REFRESH_TAB_START': {
            let tabs = [];

            state.tabs.map((item, index) => {
                if (item.title === action.title)
                    item.loading = true;
                tabs.push(item)
            });
            return {
                ...state,
                tabs: tabs,
            };
        }

        case 'TAB_BODY_SCROLLING':

            const width = Dimensions.get('window').width;
            const checkItemPosition = action.offset / width;

            if (Number.isInteger(checkItemPosition)) {

                let toWidth = 0;
                for (let i = 0; i < checkItemPosition - 1; i++) {
                    toWidth += state.tabHeaderTextWidth[i]
                }

                // state.headerRef.scrollTo({x: toWidth, y: 0, animated: true});

                return {
                    ...state,
                    activeIndex: checkItemPosition
                };
            }
            break;

        case 'TAB_CHANGED':
            // state.bodyRef.scrollToIndex({animated: true, index: action.newIndex,});
            return {
                ...state,
                activeIndex: action.newIndex
            };

        case 'ADD_TAB_BODY_REF':
            state.bodyRef = action.ref;
            return state;

        case 'ADD_TAB_HEADER_REF':
            state.headerRef = action.ref;
            return state;

        case 'TAB_HEADER_TEXT_WIDTH':
            state.tabHeaderTextWidth[action.index] = action.width;
            return state;

    }

    return state
};
