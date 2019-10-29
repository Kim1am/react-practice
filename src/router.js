import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
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

class IRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <HashRouter>
        <Container>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' render={() =>
            <Admin>
              <Switch>
                <Route exact path='/admin/home' component={Home}></Route>
                <Route exact path='/admin/ui/buttons' component={Buttons}></Route>
                <Route exact path='/admin/ui/modals' component={Modals}></Route>
                <Route exact path='/admin/ui/loadings' component={Loadings}></Route>
                <Route exact path='/admin/ui/notifications' component={Notifications}></Route>
                <Route exact path='/admin/ui/tabs' component={Tab}></Route>
                <Route exact path='/admin/ui/gallery' component={Gallery}></Route>
                <Route exact path='/admin/ui/carousel' component={Carousels}></Route>
                <Route exact path='/admin/ui/messages' component={Messages}></Route>

                <Route exact path='/admin/form/login' component={LoginForm}></Route>
                <Route exact path='/admin/form/reg' component={Reg}></Route>

                <Route exact path='/admin/table/basic' component={BasicTable}></Route>
                <Route exact path='/admin/table/high' component={HighTable}></Route>

                <Route exact path='/admin/city' component={City}></Route>
                <Route exact path='/admin/order' component={Order}></Route>

                <Route exact path='/admin/user' component={User}></Route>
                <Route exact path='/admin/bikeMap' component={bikeMap}></Route>
                <Route component={notFound}></Route>
              </Switch>
            </Admin>
          }></Route>
          <Route path='/common' render={() =>
            <Common>
              <Route exact path='/common/order/detail/:orderId' component={OrderDetail}></Route>
            </Common>
          }>
          </Route>
        </Container>
      </HashRouter>
    );
  }
}

export default IRouter;
