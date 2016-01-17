import React from 'react';
import Helmet from "react-helmet";

export default class Home extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div id="home-component">
                <div className="ui center aligned grid">
                <img src={require("../../../images/dumbo.gif")} className="ui image" />
                </div>
            </div>
        );
    }
}
