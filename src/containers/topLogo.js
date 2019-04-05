/**
 * @author Faisal Manzer
 * @class TopLogo
 *
 * Redux wrapper for component.
 */

import TopLogo from "../components/topLogo";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        theme: state.theme.colors
    }
}

export default connect(mapStateToProps)(TopLogo)
