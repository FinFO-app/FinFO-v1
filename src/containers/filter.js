import {connect} from "react-redux";
import Filter from "../components/filter";

function mapStateToProps(state) {
    return {
        theme: state.theme.colors,
        categories: state.settings.categories
    }
}

export default connect(mapStateToProps)(Filter);
