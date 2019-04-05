import TabHeader from '../components/tabHeader';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {
        tabs: state.tabs.tabs,
        activeTabIndex: state.tabs.activeIndex,
        theme: state.theme.colors
    }
}

export default connect(mapStateToProps)(TabHeader);
