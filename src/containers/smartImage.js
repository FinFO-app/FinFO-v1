import SmartImage from "../components/smartImage";
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {
        placeHolderImage: state.theme.colors.placeHolderImage
    }
}

export default connect(mapStateToProps)(SmartImage);
