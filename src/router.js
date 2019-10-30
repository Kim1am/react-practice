import React, {Component} from 'react';
import {HashRouter, Route, Switch,Redirect} from 'react-router-dom'
import Container from './components/Container/Container'
import Login from './pages/login'
import Admin from './pages/admin/admin';
import Buttons from "./pages/ui/buttons/index.js";
import Modals from './pages/ui/modal/index.js'
import notFound from "./pages/404";
import Loadings from "./pages/ui/loadings";
import Notifications from "./pages/ui/notifications";
import Messages from "./pages/ui/messages";
import Home from "./pages/home";
import Tab from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import Carousels from "./pages/ui/carousel";
import LoginForm from "./pages/form/login";
import Reg from './pages/form/reg';
import BasicTable from "./pages/table/basicTable";
import HighTable from "./pages/table/highTable";
import City from "./pages/city";
import Order from "./pages/order";
import Common from "./pages/common";
import OrderDetail from "./pages/order/detail";
import User from "./pages/user";
import bikeMap from "./pages/bikeMap";
import Bar from "./pages/charts/bar";
import Pie from "./pages/charts/pie";
import Line from "./pages/charts/line";
import Rich from "./pages/rich";
import Permission from "./pages/permission";

class IRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <HashRouter>
        <Container>
          <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/common' render={() =>
              <Common>
                <Route exact path='/common/order/detail/:orderId' component={OrderDetail}></Route>
              </Common>
            }>
            </Route>
            <Route path='/' render={() =>
              <Admin>
                <Switch>
                  <Route exact path='/home' component={Home}></Route>
                  <Route exact path='/ui/buttons' component={Buttons}></Route>
                  <Route exact path='/ui/modals' component={Modals}></Route>
                  <Route exact path='/ui/loadings' component={Loadings}></Route>
                  <Route exact path='/ui/notifications' component={Notifications}></Route>
                  <Route exact path='/ui/tabs' component={Tab}></Route>
                  <Route exact path='/ui/gallery' component={Gallery}></Route>
                  <Route exact path='/ui/carousel' component={Carousels}></Route>
                  <Route exact path='/ui/messages' component={Messages}></Route>
                  <Route exact path='/form/login' component={LoginForm}></Route>
                  <Route exact path='/form/reg' component={Reg}></Route>
                  <Route exact path='/table/basic' component={BasicTable}></Route>
                  <Route exact path='/table/high' component={HighTable}></Route>
                  <Route exact path='/city' component={City}></Route>
                  <Route exact path='/order' component={Order}></Route>
                  <Route exact path='/user' component={User}></Route>
                  <Route exact path='/bikeMap' component={bikeMap}></Route>
                  <Route exact path='/charts/bar' component={Bar}></Route>
                  <Route exact path='/charts/pie' component={Pie}></Route>
                  <Route exact path='/charts/line' component={Line}></Route>
                  <Route exact path='/rich' component={Rich}></Route>
                  <Route exact path='/permission' component={Permission}></Route>
                  <Redirect to='/home'></Redirect>
                  <Route component={notFound}></Route>
                </Switch>
              </Admin>
            }></Route>
          </Switch>
        </Container>
      </HashRouter>
    );
  }
}

export default IRouter;
