import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Link, IndexLink, browserHistory, Lifecycle} from 'react-router';


class MainLayout extends Component{
  render() {
    return (
      <div className="app">
        <aside className="primary-aside">
          <ul>
            <li><IndexLink to="/" activeStyle={{ color: 'green' }}>Home</IndexLink></li>
            <li><Link to="/users" activeStyle={{ color: 'red' }}>Users</Link></li>
            <li><Link to="/inputsave" activeStyle={{ color: 'red' }}>InputSave</Link></li>
          </ul>
        </aside>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

class Home extends Component{
  render() {
    return (<h1>Home Page</h1>)
  }
}

class UserList extends Component{
  render() {
    return (
      <ul className="user-list">
        <li>byronlun</li>
        <li>xiaoyu</li>
        <li>ben</li>
      </ul>
      )
  }
}

class InputSave extends Component{
  constructor(props) {
    super(props);
    this.state = {
      save: true
    };
    //Member methods are not "auto-bound" in ES6 classes
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  
  // 不知道怎么用~要用到再看把
  routerWillLeave(nextLocation) {
      if (!this.state.save) {
      console.log('你的内容尚未保存,确定离开?');
      return '你的内容尚未保存,确定离开?'
    }
  }

  handleChange() {
    this.setState({save: false});
    console.log(this.state.save);
  }
  handleSave() {
    this.setState({save: true});
    console.log(this.state.save);
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.handleSave}>save</button>
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home} />
      <Route path="users" component={UserList} onEnter={
        () => {console.log('可以利用onenter做验证或者替代redirect')}
      }/>
      <Route path="inputsave" component={InputSave} />
    </Route>
  </Router>
), document.getElementById('root'))