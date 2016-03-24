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
            processed_steps: null,
            step: 1
        };
    }

    componentDidMount() {
		$.get("/problems/" + this.props.params.problem_id, function(result) {
			this.setState({
                problem: result,
                processed_tags: this.processTags(JSON.parse(result.tags)),
                processed_hierarchy: this.processHierarchy(JSON.parse(result.hierarchy)),
                processed_steps: this.processSteps(result.steps)
			});
		}.bind(this));
    }

    handleBackClickHandler(e) {
        e.preventDefault();

        var visible = $('.step').not(".hidden");

        visible.transition({
            animation : 'fade left',
            duration  : 600,
            onComplete : function() {
                visible.prev('.step').transition({
                    animation : 'fade right',
                duration  : 600,
                });
                if (visible.prev('.step').prev('.step').length == 0) {
                    $('button.red').addClass("disabled");
                }
            }
        });

        $(ReactDOM.findDOMNode(this.refs.forwardButton)).removeClass("disabled");
        this.setState({ step: Math.max(this.state.step - 1, 1) });
    }

    handleForwardClickHandler(e) {
        e.preventDefault();

		var visible = $('.step').not(".hidden");

		visible.transition({
			animation : 'fade right',
			duration  : 600,
			onComplete : function() {
				visible.next('.step').transition({
					animation : 'fade left',
					duration  : 600,
				});
				if (visible.next('.step').next('.step').length == 0) {
					$('button.green').addClass("disabled");
				}
			}
		});

        $(ReactDOM.findDOMNode(this.refs.backButton)).removeClass("disabled");
        this.setState({ step: Math.min(this.state.step + 1, this.state.problem.steps.length) });
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

    showAnswerClickHandler(e) {
        e.preventDefault();

        // We shouldn't be selecting by class here.
        var visible = $('.step').not(".hidden").find('.answer-text');

        visible.transition({
            animation : 'fade down',
            duration  : 600,
            onComplete : function() {
            }
        });
    }

    processSteps(steps) {
		return (
			steps.map(function(s, i) {
                  var stepClasses = "step ui relaxed grid" + (i==0 ? "" : " hidden transition");
				  return [

                        <div id={i} className={stepClasses}>
                            <div className="row question">
                                <div className="fifteen wide column">
                                     <img src={require("../../../images/patrick.png")} className="bot left floated mini ui circular image"/>
                                      <div dangerouslySetInnerHTML={{__html: s.question}}></div>
                                </div>
                                <div className="one wide column">
                                    <button className="show-answer-btn ui icon button" onClick={this.showAnswerClickHandler.bind(this)} >
                                      <i className="angle big double down icon"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="row hidden transition answer-text">
                                <div className="fifteen wide column">
                                    <img src={require("../../../images/patrick.png")} className="bot left floated mini ui circular image"/>
                                    <span dangerouslySetInnerHTML={{__html: s.answer}}></span>
                                </div>
                            </div>
                        </div>
				  ]
			}.bind(this)))
    }

    render() {
        if (this.state.problem != undefined) {
            var exam = this.state.problem.exam.id;
            var problem = this.state.problem.order;
            var step = this.state.step;
            ga('send', 'event', 'Exam ' + exam, 'Problem ' + problem, 'viewed step', step)
            console.log({ exam: exam, problem: problem, step: step });
        }

		var formClasses = "ui form" + (this.state.problem !== null ? "" : " loading");

        var question_choices;
        if (this.state.problem && this.state.problem.choices_img_url) {
            question_choices = (
                <div id="question-choices" className="ui relaxed grid">
                    <div className="eight wide column">
                        <h2>Question</h2>
                        <img className="ui image" src={this.state.problem == null ? "" : this.state.problem.problem_img_url}/>
                    </div>
                    <div className="eight wide column">
                        <h2>Choices</h2>
                        <img className="ui image" src={this.state.problem == null ? "" : this.state.problem.choices_img_url}/>
                    </div>
                </div>
            );
        } else {
            question_choices = (
                <div id="question-choices" className="ui relaxed grid">
                    <div className="sixteen wide column">
                        <h2>Question</h2>
                        <img className="ui image" src={this.state.problem == null ? "" : this.state.problem.problem_img_url}/>
                    </div>
                </div>
            );
        }

        return (
            <div id="problem-component">
				<Helmet
					title="dumbo - Problem"
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
                          <Link className="section" to={this.state.problem == null ? "" : `/exam/${this.state.problem.exam.id}`}>{this.state.problem == null ? "" : this.state.problem.exam.name}</Link>
                          <i className="right chevron icon divider"></i>
                          <div className="active section">Problem {this.state.problem == null ? "" : this.state.problem.order}</div>
                        </div>
                    </div>
                    <div className="ui text container">
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
                    {question_choices}
                    <div className="ui relaxed grid">
                        <div className="column">
                            <h2>Help</h2>
                        </div>
                    </div>
                    {this.state.processed_steps}
                    <br/>
                    <br/>
                    <div id="controls" className="ui center aligned grid">
                        <div className="column">
                            <div className="ui buttons">
                                <button className="ui disabled control labeled red icon button" ref="backButton" onClick={this.handleBackClickHandler.bind(this)}>
                                    <i className="left chevron icon"></i>
                                    Back
                                </button>
                                <button className="ui control right labeled green icon button" ref="forwardButton" onClick={this.handleForwardClickHandler.bind(this)}>
                                    Forward
                                    <i className="right chevron icon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
