import Home from '../screens/home'
import CategorySelection from '../screens/categogySelection';

export default {
    allScreens: {
        'HOME': {screen: Home},

        // Modal is not implemented fully
        'MODAL': {screen: CategorySelection}
    },
    initialScreen: 'HOME',
    activeScreen: 'HOME'
}
