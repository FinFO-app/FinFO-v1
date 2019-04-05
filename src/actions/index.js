export const tabLoaded = tabs => ({
    type: 'TAB_LOADED',
    tabs: tabs
});

export const tabDataLoaded = (title, data) => ({
    type: 'TAB_DATA_LOADED',
    title: title,
    data: data
});

export const loadingTabData = title => ({
    type: 'REFRESH_TAB_START',
    title: title
});

export const tabChanged = index => ({
    type: 'TAB_CHANGED',
    newIndex: index
});

export const tabBodyScrolling = offset => ({
    type: 'TAB_BODY_SCROLLING',
    offset: offset
});

export const addTabBodyRef = body => ({
    type: 'ADD_TAB_BODY_REF',
    ref: body
});

export const addTabHeaderRef = body => ({
    type: 'ADD_TAB_HEADER_REF',
    ref: body
});

export const saveTabHeaderTextWidth = (index, width) => ({
    type: 'TAB_HEADER_TEXT_WIDTH',
    width: width,
    index: index
});

export const statusBarHeightChanged = (height) => ({
    type: 'STATUS_BAR_HEIGHT_CHANGED',
    height: height
});

export const toggleStatusBar = () => ({
    type: 'TOGGLE_STATUS_BAR_VISIBILITY',
});

export const remoteFileWillLoad = () => ({
    type: 'REMOTE_FILE_WILL_LOAD'
});

export const remoteFileDidLoad = () => ({
    type: "REMOTE_FILE_DID_LOAD"
});

export const remoteFileLoadingError = () => ({
    type: "ERROR_IN_LOADING_REMOTE_FILE"
});

export const audioWillLoad = () => ({
    type: "AUDIO_WILL_LOAD"
});

export const audioDidLoad = () => ({
    type: "AUDIO_DID_LOAD"
});

export const audioPlayingError = () => ({
    type: "ERROR_IN_PLAYING_AUDIO"
});

export const toggleAudioState = () => ({
    type: "TOGGLE_AUDIO_STATE"
});

export const statePlayAudio = () => ({
    type: "PLAY_AUDIO"
});

export const statePauseAudio = () => ({
    type: "PAUSE_AUDIO_STATE"
});

export const updatePlayer = (tabTitle, title) => ({
    type: 'UPDATE_PLAYER_STATE',
    tabTitle: tabTitle,
    cardTitle: title
});

export const playNextAudio = (dispatch) => ({
    type: 'PLAY_NEXT_AUDIO',
    dispatch: dispatch
});

export const playPreviousAudio = (dispatch) => ({
    type: 'PLAY_PREVIOUS_AUDIO',
    dispatch: dispatch
});

export const playlistLoad = (title, data) => ({
    type: 'PLAYLIST_LOADED',
    title: title,
    data: data
});

export const toggleCategoryFilter = (key) => ({
    type: "TOGGLE_CATEGORY_FILTER",
    key: key
});
