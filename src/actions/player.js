import FB from "rn-fetch-blob";
import Sound from "react-native-sound";
import {
    audioDidLoad,
    audioPlayingError,
    remoteFileDidLoad,
    remoteFileLoadingError,
    remoteFileWillLoad,
    statePauseAudio,
    statePlayAudio,
    updatePlayer
} from "./index";
import {notification} from "./notfication";

export let s = null;

let superDispatch = null;
export let totalCount = 0;
export let currentCount = 0;

// TODO: Add seek bar

export async function metroModeStart(allNews) {

    function download(tab, id) {
        downloadAudio(tab, allNews[tab][id])
            .then(() => {
                console.log("Downloded", allNews[tab][id].audio);
            })
            .catch(error => {
                console.log("Download error", error);
            })
            .finally(() => {
                currentCount++;
                console.log(`${currentCount}/${totalCount}`, currentCount * 100 / totalCount);
                if (allNews[tab][id + 1])
                    download(tab, id + 1)
            })
    }

    Object.keys(allNews).map(tab => {
        totalCount += allNews[tab].length;
    });

    Object.keys(allNews).map(tab => {
        download(tab, 0);
    })
}

export async function play(tabTitle, nextNews) {
    s.play(() => {
        if (nextNews)
            playAudio(tabTitle, nextNews, superDispatch);
        else
            superDispatch(statePauseAudio())
    })
}

export function playAudio(tabTitle, news, dispatch) {

    superDispatch = dispatch;

    console.log(tabTitle, news.title, news.audio);
    dispatch(updatePlayer(tabTitle, news.title));

    dispatch(remoteFileWillLoad());
    downloadAudio(tabTitle, news)
        .then((path) => {
            dispatch(remoteFileDidLoad());
            loadAudio(path)
                .then(() => {
                    dispatch(audioDidLoad());
                    dispatch(statePlayAudio())
                })
                .catch((error) => {
                    console.log("PLAYING ERROR", error);
                    dispatch(audioPlayingError())
                });
        })
        .catch((error) => {
            console.log(error);
            dispatch(remoteFileLoadingError(tabTitle, news.id))
        })
}

async function loadAudio(audio) {
    if (s)
        s.release();

    return new Promise((resolve, reject) => {
        s = new Sound(audio, null, (error) => {
            if (error)
                reject(error);
            else {
                // savePlayList();
                resolve("Loaded");
            }
        });
    });

}


export async function downloadAudio(tabTitle, news) {

    function cleanName(name) {
        return name.split(" ").join("-").toLowerCase()
    }

    const path = `${FB.fs.dirs.DocumentDir}/audio/${cleanName(tabTitle)}/${cleanName(news.title)}.mp3`;
    return new Promise((resolve, reject) => {

        FB.fs.exists(path)
            .then((exist) => {
                if (!exist) {

                    FB.config({
                        path: path
                    })
                        .fetch('GET', news.audio)
                        .then((res) => {

                            resolve(res.path());
                        })
                        .catch((error) => {
                            console.log("Downloading Error", error);
                            reject("Exist Error");
                        });

                } else {
                    resolve(path);
                }
            })
            .catch((error) => {
                console.log("File Exist Error", error);
                notification({
                    title: error,
                    alertType: "error"
                });
                reject("Exist Error")
            });

    });

}
