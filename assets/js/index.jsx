import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, browserHistory, Router, Route, Link } from 'react-router'
import Helmet from "react-helmet";
import '!style!css!less!./index.less';

import Home from './components/Home/Home';

export default class PaddedContainer extends React.Component {
    render() {
        return (
            <div id="padded-container" className="ui text container">
                {this.props.children}
            </div>
        )
    }
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={PaddedContainer}>
            <IndexRoute component={Home} />
        </Route>
    </Router>
), document.getElementById('react-app'))
