import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin';
import Buttons from "./pages/ui/buttons/index.js";
import notFound from "./pages/404";
import Home from "./pages/home";

class IRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <HashRouter>
        <App>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' render={() =>
            <Admin>
              <Switch>
                <Route path='/admin/home' exact component={Home}></Route>
                <Route exact path='/admin/ui/buttons' component={Buttons}></Route>
                <Route component={notFound}></Route>
              </Switch>
            </Admin>
          }></Route>
        </App>
      </HashRouter>
    );
  }
}

export default IRouter;