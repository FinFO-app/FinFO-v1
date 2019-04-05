import FB from "rn-fetch-blob";

const fs = FB.fs;
const settingPath = "data/settings";

export let settingsObj = {
    speed: 1,
    categories: {},
    metroMode: false, // if true download all items if not downloaded,
    askedForMetro: false
};

export function settings(newSettings = undefined, toSave = false) {
    if (newSettings) {
        settingsObj = newSettings;
    }

    if (toSave){
        saveSettings();
        console.log("New Settings saved");
    }

    return JSON.parse(JSON.stringify(settingsObj))
}

export function loadSettings() {
    const path = `${fs.dirs.DocumentDir}/${settingPath}`;

    fs.exists(path)
        .then(exist => {
            if (exist)
                fs.readFile(path, 'base64')
                    .then((data) => {
                        settings(JSON.parse(FB.base64.decode(data)));
                        console.log(JSON.stringify(settings()));
                    })
                    .catch(error => {
                        console.log("Load error", error);
                    });
            else
                saveSettings();
        });
}

export function saveSettings() {

    const path = `${fs.dirs.DocumentDir}/${settingPath}`;

    fs.writeFile(path, FB.base64.encode(JSON.stringify(settingsObj)), 'base64')
        .then(() => {
            console.log("Saved", JSON.stringify(settingsObj))
        })
        .catch(error => {
            console.log("Saved Settings", error)
        })

}
