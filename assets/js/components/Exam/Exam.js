import React from 'react';
import Helmet from "react-helmet";
import '!style!css!less!./Exam.less';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';

export default class Exam extends React.Component {

    constructor() {
        super();

        this.state = {
            processed_problems_text: null,
            processed_problems_img: null,
            exam_name: null
        };
    }
    
    componentDidMount() {
        $(ReactDOM.findDOMNode(this.refs.menu)).find('.item').tab();

		$.get("/exams/" + this.props.params.exam_id, function(result) {
			this.setState({
                exam_name: result.name,
				processed_problems_text: this.processProblemsAsText(result.problems),
                processed_problems_img: this.processProblemsAsImage(result.problems)
			});
		}.bind(this));
    }

    processTags(tags) {
		return (
			tags.map(function(s, i) {
                var classContent = "ui " + s.color + " horizontal label";
				  return [
                        <div className={classContent}>{s.content}</div>
				  ]
			}))
    }

    processProblemsAsText(problems) {
		return (
			problems.map(function(s, i) {
				  return [
                    <Link className="item" to={`/problem/${s.id}`}>
						{s.display_text}&nbsp;
                        {this.processTags(JSON.parse(s.tags))}
                      </Link>
				  ]
			}.bind(this)))
    }
    

    processProblemsAsImage(problems) {
		return (
			problems.map(function(s, i) {
				  return [
                <div>
                      <Link to={`/problem/${s.id}`}>
                      <img className="ui bordered image" src={s.problem_img_url} />
                        </Link>
                      <br/><br/>
                </div>
				  ]
			}))
    }

    render() {
		var formClasses = "ui form" + ((this.state.processed_problems_img !== null && this.state.processed_problems_text !== null) ? "" : " loading");

        return (
            <div id="exam-component">
				<Helmet
					title="dumbo - Exams"
				/>
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
                          <div className="active section">{this.state.exam_name}</div>
                        </div>
                        <div ref="menu" id="menu" className="ui small red two item menu">
                            <a className="item active" data-tab="text">Text</a>
                            <a className="item " data-tab="image">Image</a>
                        </div>
                    </div>
                    <div className="ui tab " data-tab="image">
                            <div id="img-list" className="ui center aligned grid">
                                {this.state.processed_problems_img}
                            </div>
                    </div>
                    <div className="ui tab active" data-tab="text">
                        <div className="ui text container">
                            <div id="text-list" className="ui divided large selection list">
                                {this.state.processed_problems_text}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
