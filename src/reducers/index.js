import {combineReducers} from 'redux'
import {statusBar} from "./statusBar";
import {theme} from "./theme";
import {tabs} from "./tabs";
import {navigator} from "./navigator";
import {player} from "./player";
import {settings} from "./settings";

export default combineReducers({
    statusBar,
    theme,
    navigator,
    tabs,
    player,
    settings
})
