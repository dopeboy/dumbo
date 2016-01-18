import React from 'react';
import Helmet from "react-helmet";
import '!style!css!less!./Home.less';
import { Link } from 'react-router'

export default class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            processed_exams: null
        };
    }
    
    componentDidMount() {
		$.get('/exams', function(result) {
			this.setState({
				processed_exams: this.processExams(result)
			});
		}.bind(this));
    }

    processExams(exams) {
		return (
			exams.map(function(s, i) {
				  return [
                    <Link className="item" to={`exam/${s.id}`}>{s.name}</Link>
				  ]
			}))
    }

    render() {
		var formClasses = "ui form" + ((this.state.processed_exams !== null) ? "" : " loading");

        return (
            <div id="home-component">
                <div className="ui center aligned grid">
                    <img src={require("../../../images/dumbo.gif")} className="ui image" />
                </div>
                <br/>
                <br/>
                <div className="ui center aligned grid">
                    <h2 id="intro" className="ui center aligned header">
                    Welcome to dumbo. 
                    </h2>
                </div>
                <br/>
                <br/>
                <form ref="form" className={formClasses}>
                    <div className="ui center aligned grid">
                        <div id="exam-list" className="ui center aligned raised segment">
                            <h4 className="ui center aligned header" >Solution sets</h4>
                            <div className="ui list">
                                {this.state.processed_exams}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
