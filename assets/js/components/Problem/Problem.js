import React from 'react';
import Helmet from "react-helmet";
import '!style!css!less!./Problem.less';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';

export default class Problem extends React.Component {

    constructor() {
        super();

        this.state = {
            problem: null,
            processed_tags: null,
            processed_hierarchy: null,
        };
    }
    
    componentDidMount() {
		$.get("/problems/" + this.props.params.problem_id, function(result) {
            console.log(result);
			this.setState({
                problem: result,
                processed_tags: this.processTags(JSON.parse(result.tags)),
                processed_hierarchy: this.processHierarchy(JSON.parse(result.hierarchy))
			});
		}.bind(this));
    }

    processTags(tags) {
		return (
			tags.map(function(s, i) {
                var classContent = "ui " + s.color + " mini label";
				  return [
                        <div className={classContent}>{s.content}</div>
				  ]
			}))
    }

    processHierarchy(categories) {
		return (
			categories.map(function(s, i) {
				  return [
                <span>
                        <span className="section">{s}</span>
                        {i==categories.length-1 ? "" : <i className="right chevron icon divider"></i>}
                </span>
				  ]
			}))
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
                                    {this.state.processed_hierarchy}
                                </div>
                            </div>
                            <div className="eight wide column">
                                <h4>Tags</h4>
                                <div id="tags">
                                    {this.state.processed_tags}
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
