/**
 * @author Faisal Manzer
 * @class Header
 *
 * Redux wrapper for component.
 */


import {connect} from "react-redux";
import {Header} from "../components";

function mapStateToProps(state) {
    return {
        height: state.statusBar.height,
        theme: state.theme.colors,
        hidden: state.statusBar.hidden
    }
}

export default connect(mapStateToProps)(Header);
