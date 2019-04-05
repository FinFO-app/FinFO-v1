import FB from "rn-fetch-blob";

const fs = FB.fs;

export function clearAllCache() {
    fs.ls(fs.dirs.DocumentDir)
        .then(files => {
            files.map((file) => {
                console.log("Deleting", file);
                fs.unlink(fs.dirs.DocumentDir + `/${file}`);
            });
        });
}

export function clearOldCache() {
    const basePath = `${fs.dirs.DocumentDir}/audio`;

    fs.lstat(basePath)
        .then(tabs => {
            tabs.map(tab => {
                fs.lstat(`${tab.path}`)
                    .then(files => {
                        files.map((file) => {
                            let diffInMilliSec = Math.abs(Date.now() - file.lastModified);
                            let days = diffInMilliSec / (1000 * 60 * 60 * 24);
                            console.log("Checking", file.path, days);
                            if (days >= 1) {
                                fs.unlink(`${file.path}`)
                                    .then(() => {
                                        console.log("Removed", `${file.path}`);
                                    })
                                    .catch(error => {
                                        console.log("Error Deleting", error);
                                    });
                            }
                        });
                    })
                    .catch(error => {
                        console.log("delting File Error", error);
                    })
            })
        })
        .catch(error => {
            console.log("Deleting error", error);
        })
}

export function saveTabData(title, data) {
    const path = `${fs.dirs.DocumentDir}/data/tabs/${title}`;
    fs.writeFile(path, FB.base64.encode(JSON.stringify(data)), 'base64')
        .then(() => {
            console.log("Saved", title)
        })
        .catch(error => {
            console.log("Saved Settings", error)
        })
}

export function loadSavedTabData(title) {
    const path = `${fs.dirs.DocumentDir}/data/tabs/${title}`;

    return new Promise((resolve, reject) => {
        fs.readFile(path, 'base64')
            .then((data) => {
                resolve(JSON.parse(FB.base64.decode(data)))
            })
            .catch(error => {
                reject(error);
            });
    });
}
