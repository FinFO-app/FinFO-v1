import Card from '../components/card'
import {connect} from "react-redux"
import React from 'react';

function mapStateToProps(state) {
    return {
        theme: state.theme.colors
    }
}

export default connect(mapStateToProps)(Card)
