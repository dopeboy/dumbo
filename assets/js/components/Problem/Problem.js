import React from 'react';
import Helmet from "react-helmet";
import '!style!css!less!./Problem.less';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';

export default class Problem extends React.Component {

    constructor() {
        super();

        this.state = {
            problem: null
        };
    }
    
    componentDidMount() {
		$.get("/problems/" + this.props.params.problem_id, function(result) {
			this.setState({
                problem: result
			});
		}.bind(this));
    }

    render() {
		var formClasses = "ui form" + (this.state.problem !== null ? "" : " loading");

        return (
            <div id="problem-component">
                <div className="ui text container">
                    <div id="header-img" className="ui center aligned grid">
                        <Link to="/">
                            <img src={require("../../../images/dumbo_small.gif")} className="" />
                        </Link>
                    </div>
                    <br/>
                </div>
                <form ref="form" className={formClasses}>
                    <div className="ui text container">
                        <div id="breadcrumbs" className="ui huge breadcrumb">
                          <Link className="section" to="/">Home</Link>
                          <i className="right chevron icon divider"></i>
                          <Link className="section" to={this.state.problem == null ? "" : `/exam/${this.state.problem.exam.id}`}>{this.state.problem == null ? "" : this.state.problem.exam.name}</Link>
                          <i className="right chevron icon divider"></i>
                          <div className="active section">Problem {this.state.problem == null ? "" : this.state.problem.order}</div>
                        </div>
                    </div>
                    <div id="solution" className="ui text container">
                        <div id="metadata" className="ui grid">
                            <div className="eight wide column">
                                <h4>Type</h4>
                                <div className="ui small breadcrumb">
                                    <span className="section">Geometry</span>
                                    <i className="right chevron icon divider"></i>
                                    <span className="section">Coordinate geometry</span>
                                    <i className="right chevron icon divider"></i>
                                    <div className="section">Circles</div>
                                </div>
                            </div>
                            <div className="eight wide column">
                                <h4>Tags</h4>
                                <div id="tags">
                                    <a className="ui red mini label">circle</a>
                                    <a className="ui teal mini label">pythagorean</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ui divider"></div>
                    <br/>
                    <div id="question" className="ui relaxed grid">
                        <div className="eight wide column">
                            <h2>Question</h2>
                            <img className="ui image" src={this.state.problem == null ? "" : this.state.problem.problem_img_url}/>
                        </div>
                        <div className="eight wide column">
                            <h2>Choices</h2>
                            <img className="ui image" src={this.state.problem == null ? "" : this.state.problem.choices_img_url}/>
                        </div>
                    </div>
                    <div className="ui relaxed grid">
                        <div className="column">
                            <h2>Help</h2>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
