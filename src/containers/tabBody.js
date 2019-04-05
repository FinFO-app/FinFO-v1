import TabBody from "../components/tabBody";
import {connect} from 'react-redux';
import React from "react";

function mapStateToProps(state) {
    return {
        data: state.tabs.tabs,
        // renderer: (item, index) => (<TabBodyRenderer loading={item.loading} data={item.data} title={item.title} />)
    }
}

export default connect(mapStateToProps)(TabBody);
