import SourceText from "../components/sourceText"
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {
        theme: state.theme.colors
    }
}

export default connect(mapStateToProps)(SourceText)
