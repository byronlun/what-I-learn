import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

class Home extends Component {
	render() {
		return (<h1>Welcome to the Home Page</h1>)
	}
}

render((
	<Router history={browserHistory}>
		<Route path="/" component={Home} />
	</Router>
), document.getElementById('root'))
