import React from 'react';
import Helmet from "react-helmet";
import '!style!css!less!./ProblemMobile.less';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';

export default class ProblemMobile extends React.Component {

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
                  var stepClasses = "step ui grid" + (i==0 ? "" : " transition");
				  return [

                        <div id={i} className={stepClasses}>
                            <div className="row question">
                                <div className="sixteen wide column">
                                     <img src={require("../../../images/patrick.png")} className="bot left floated mini ui circular image"/>
                                      <div dangerouslySetInnerHTML={{__html: s.question}}></div>
                                </div>
                            </div>
                            <div className="row transition answer-text">
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
            var completion = this.state.step/this.state.problem.steps.length;
            ga('send', 'event', 'Exam ' + exam, 'Problem ' + problem, "completion", completion)
            console.log({ exam: exam, problem: problem, completion: completion });
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
                <br/>
                {this.state.processed_steps}
            </div>
        );
    }
}
