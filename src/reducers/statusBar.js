// import {Constants} from 'expo';

import { getStatusBarHeight } from 'react-native-status-bar-height';

// this is a experiment
// try if not works give it up

export const statusBar = (state={height: getStatusBarHeight(true), hidden: false}, action) => {

    switch (action.type) {
        case 'STATUS_BAR_HEIGHT_CHANGED':
            return {
                height: action.height,
                ...state
            };
        case 'TOGGLE_STATUS_BAR_VISIBILITY':
            return {
                hidden: true,
                ...state
            };
        default:
            return state
    }
};
