/**
 * @author Faisal Manzer
 * @class App
 *
 * Nothing special here.
 * Just creating root component.
 * And passes store from redux.
 */

import React from 'react';
import {Provider} from 'react-redux';

// Main Store
import store from './src/stores/index';
import Index from "./src";

export default class App extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <Provider store={store}>
                <Index/>
            </Provider>
        );
    }
}
