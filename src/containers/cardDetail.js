import CardDetail from "../components/cardDetail"
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {
        theme: state.theme.colors
    }
}

export default connect(mapStateToProps)(CardDetail)
