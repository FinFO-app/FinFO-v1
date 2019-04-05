import store from "../stores/playlist";
import {downloadAudio, playAudio, s as audio, play, metroModeStart} from "../actions/player"
import {settings} from "../actions/settings";
// import MusicControl from "react-native-music-control";
// import NotificationIcon from "../../assets/images/palceHolderImage.png";

export const player = (state = store, action) => {

    function nextNews() {
        return state.data[state.tabPlaying][state.playingId + 1]
    }

    switch (action.type) {
        case "PLAY_AUDIO":
            play(state.tabPlaying, nextNews())
                .then();
            const plyingNow = state.data[state.tabPlaying][state.playingId];
            // MusicControl.setNowPlaying({
            //     title: plyingNow.title,
            //     artwork: plyingNow.image, // URL or RN's image require()
            //     artist: plyingNow.source,
            //     // album: 'Thriller',
            //     // genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
            //     // duration: 294, // (Seconds)
            //     // description: '', // Android Only
            //     color: 0xFFFFFF, // Notification Color - Android Only
            //     // date: plyingNow.datetime, // Release Date (RFC 3339) - Android Only
            //     // rating: 84, // Android Only (Boolean or Number depending on the type)
            //     // notificationIcon: NotificationIcon // Android Only (String), Android Drawable resource name for a custom notification icon
            // });
            return {
                ...state,
                isPlaying: true
            };
        case "PAUSE_AUDIO_STATE":

            // MusicControl.updatePlayback({
            //     state: MusicControl.STATE_PAUSED,
            // });

            return {
                ...state,
                isPlaying: false
            };

        case "TOGGLE_AUDIO_STATE":
            if (state.isPlaying)
                audio.pause();
            else
                play(state.tabPlaying, nextNews())
                    .then();

            // MusicControl.updatePlayback({
            //     state: state.isPlaying? MusicControl.STATE_PAUSED : MusicControl.STATE_PLAYING,
            // });

            return {
                ...state,
                isPlaying: !state.isPlaying
            };

        case "REMOTE_FILE_WILL_LOAD":
            return {
                ...state,
                isLoading: true
            };

        case "REMOTE_FILE_DID_LOAD":
            return {
                ...state,
                isLoading: false
            };

        case "UPDATE_PLAYER_STATE":
            let id = 0;

            state.data[action.tabTitle].map((item, index) => {
                if (action.cardTitle === item.title) {
                    id = index;
                    return null;
                }
            });

            if (state.data[action.tabTitle][id + 1])
                downloadAudio(action.tabTitle, state.data[action.tabTitle][id + 1])
                    .catch(error => {

                    });
            return {
                ...state,
                tabPlaying: action.tabTitle,
                playingId: id,
            };

        case "PLAY_NEXT_AUDIO":

            playAudio(state.tabPlaying, state.data[state.tabPlaying][state.playingId + 1]);
            return {
                ...state,
                playingId: state.playingId + 1,
            };

        case "PLAY_PREVIOUS_AUDIO":

            playAudio(state.tabPlaying, state.data[state.tabPlaying][state.playingId - 1]);
            return {
                ...state,
                playingId: state.playingId - 1,
            };

        case "TAB_DATA_LOADED": {
            let newData = state.data;

            newData[action.title] = [];

            action.data.map(item => {
                item.data.map(card => {
                    newData[action.title].push(card);
                })
            });

            setTimeout(() => {
                let sett = settings();
                if (sett.metroMode)
                    metroModeStart(newData);
            }, 1000);

            return {
                ...state,
                data: newData,
            };
        }

        case "METRO_MODE_START": {
            let sett = settings();
            sett.metroMode = true;
            sett.askedForMetro = true;
            settings(sett, true);
            metroModeStart(state.data);
            break;
        }
        case "METRO_MODE_CANCEL": {
            let sett = settings();
            sett.metroMode = false;
            settings(sett, true);
        }
    }

    return state;
};
