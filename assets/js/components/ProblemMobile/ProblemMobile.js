import React from 'react';
import Helmet from "react-helmet";
import '!style!css!less!./ProblemMobile.less';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import SwipeableViews from 'react-swipeable-views';

export default class ProblemMobile extends React.Component {

    constructor() {
        super();

        this.state = {
            problem: null,
            processed_steps: null,
            step: 1,
        };
    }

    componentDidMount() {
		$.get("/problems/" + this.props.params.problem_id, function(result) {
			this.setState({
                problem: result,
                processed_steps: this.processSteps(result.steps)
			});
		}.bind(this));
    }

    showAnswerClickHandler(i, e) {
        e.preventDefault();

        // We shouldn't be selecting by class here.
        var visible = $('.step#' + i).not(".hidden").find('.answer-text');
        $('.step#' + i).find('button').hide();

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
                  var stepClasses = "ui step two column grid" + (i==0 ? "" : " ");
                  var swipeNextDiv = "";

                  if (i != steps.length-1) {
                      swipeNextDiv = <div className="qa swipe-next">Swipe left to go to the next step</div>;
                  }

				  return [
                        <div id={i} className={stepClasses}>
							<div className="sixteen wide column">
								<div className="ui two column grid">
									<div className="two wide column">
										<img src={require("../../../images/patrick.png")} className="bot small ui circular image"/>
									</div>
									<div className="fourteen wide column">
										<div className="qa" dangerouslySetInnerHTML={{__html: s.question}}></div>
									</div>
                                    <div className="ui center aligned segment" style={{width: "100%", border: "0px", boxShadow: "none", marginTop: "0px"}}>
                                        <button onClick={this.showAnswerClickHandler.bind(this, i)} className="positive massive ui button">Show</button>
                                    </div>
									<div className="answer-text two wide column hidden transition">
										<img src={require("../../../images/patrick.png")} className="bot small ui circular image"/>
									</div>
									<div className="answer-text fourteen wide column hidden transition">
										<div className="qa" dangerouslySetInnerHTML={{__html: s.answer}}></div>
                                        {swipeNextDiv}
									</div>
								</div>
							</div>
						</div>
				  ]
			}.bind(this)))
    }

    onChangeIndex(newIndex, oldIndex) {
        var step = newIndex + 1;
        if (this.state.problem != undefined) {
            var exam = this.state.problem.exam.id;
            var problem = this.state.problem.order;
            var completion = step/this.state.problem.steps.length;

            ga('send', 'event', 'Exam ' + exam, 'Problem ' + problem, "completion", completion)
        }

		$('html, body').scrollTop(0);
        this.setState({step: step});
    }

    render() {
        var num_steps = null;

        if (this.state.problem != undefined) {
            var exam = this.state.problem.exam.id;
            var problem = this.state.problem.order;
            var completion = this.state.step/this.state.problem.steps.length;
            ga('send', 'event', 'Exam ' + exam, 'Problem ' + problem, "completion", completion)
            console.log({ exam: exam, problem: problem, completion: completion });

            num_steps = this.state.problem.steps.length;
        }

		var formClasses = "ui form" + (this.state.problem !== null ? "" : " loading");

        return (
            <div id="problem-component">
				<Helmet
					title="dumbo - Problem"
				/>
                <h1 className="ui centered align header">Step {this.state.step}/{num_steps}</h1>
                <br/>
                <SwipeableViews
                    containerStyle={{height: window.innerHeight}}
                    slideStyle={{height: "100%"}}
                    style={{height: "100%"}}
                    onChangeIndex={this.onChangeIndex.bind(this)}>
                    {this.state.processed_steps}
                </SwipeableViews>
                <br/>
            </div>
        );
    }
}
