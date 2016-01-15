import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import SearchBar from './components/Blah';

class App extends React.Component {
	render() {
		return (
				<div>
				<h1>App</h1>
				<ul>
				sdfsf
				dsfsdf
				</ul>
				<SearchBar />
				</div>
			   )
	}
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}></Route>
    <Route path="/idsf" component={SearchBar}></Route>
  </Router>
), document.getElementById('react-app'))
