import {settings as settingHandler, settingsObj} from "../actions/settings";


function stateOfAll(categories) {
    let allTrue = true;

    Object.keys(categories).map(key => {
        if(!categories[key])
            allTrue = false;
    });

    return allTrue;
}

export function settings(state = {...settingHandler()}, action) {

    let newState = state;
    let save = false;

    switch (action.type) {
        case "TOGGLE_CATEGORY_FILTER":
            newState.categories[action.key] = !newState.categories[action.key];
            save = true;
            break;

        case "TOGGLE_ALL_CATEGORIES":
            const h = stateOfAll(newState.categories);

            Object.keys(newState.categories).map(key => {
                newState.categories[key] = h;
            });
            save = true;
            break;

        case "RELOAD_SETTINGS":
            console.log("Reloading");
            newState = settingsObj;
    }

    if (save) {
        settingHandler(newState, true);
    }

    return newState;
}
