import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, browserHistory, Router, Route, Link } from 'react-router'
import Helmet from "react-helmet";
import '!style!css!less!./index.less';

import Home from './components/Home/Home';
import Exam from './components/Exam/Exam';
import Problem from './components/Problem/Problem';
import ProblemMobile from './components/ProblemMobile/ProblemMobile';

export default class PaddedContainer extends React.Component {
    render() {
        return (
            <div id="padded-container" className="ui text container">
                {this.props.children}
            </div>
        )
    }
}

export default class FullSizeContainer extends React.Component {
    render() {
        return (
            <div id="fullsize-container" className="">
                {this.props.children}
            </div>
        )
    }
}

export default class Naked extends React.Component {
    render() {
        return (
            <div id="" className="ui grid" style={{height:"100%"}}>
                {this.props.children}
            </div>
        )
    }
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={PaddedContainer}>
            <IndexRoute component={Home} />
            <Route path="problem_desktop/:problem_id" component={Problem}></Route>
        </Route>
        <Route path="/" component={FullSizeContainer}>
            <Route path="exam/:exam_id" component={Exam}></Route>
        </Route>
        <Route path="/" component={Naked}>
            <Route path="problem/:problem_id" component={ProblemMobile}></Route>
        </Route>
    </Router>
), document.getElementById('react-app'))
