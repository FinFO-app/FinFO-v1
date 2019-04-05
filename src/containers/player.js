import Player from "../components/player";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        theme: state.theme.colors,
        statusBarHeight: state.statusBar.height,
        data: state.player.data,
        playingId: state.player.playingId,
        tabPlaying: state.player.tabPlaying,
        isPlaying: state.player.isPlaying,
        isLoading: state.player.isLoading,
    }
}

export default connect(mapStateToProps)(Player);
