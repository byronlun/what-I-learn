import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';

class Main extends Component {
  render() {
    return (
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/widgets">Widgets</Link></li>
      </ul> 
    )
  }
}

class Home extends Component {
	render() {
		return (<h1>Welcome to the Home Page</h1>)
	}
}

class Users extends Component {
  render() {
    return (
      <ul>
        <li>user</li>
        <li>user</li>
        <li>user</li>
      </ul>
    )
  }
}

class Widgets extends Component {
  render() {
    return (
      <ul>
        <li>widget</li>
        <li>widget</li>
        <li>widget</li>
      </ul>
    )
  }
}

render((
	<Router history={browserHistory}>
    <Route path="/" component={Main} />
      <Route path="/users" component={Users} />
      <Route path="/widgets" component={Widgets} />
	</Router>
), document.getElementById('root'))
