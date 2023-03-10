import React from 'react';
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader';
import Store from '../redux';
import DevTools from '../redux/DevTools';
import App from '../containers/app';
import Login from '../containers/login';
import Main from '../containers/main';
import NotFound from '../containers/notfound';
import List from '../containers/list';
import Img from '../containers/img';
import Svg from '../containers/svg';
import Icon from '../containers/icon';
import User from '../containers/user';
import WebThree from "../containers/web3";

const Router = ({component: Component, children, ...rest}) => (
  <Route
    {...rest}
    render={props => (
      <Component {...props} ><Switch>{children}</Switch></Component>
    )}
  />
);

const Root = () => (
  <HashRouter>
    <Provider store={Store}>
      <div className="router-content">
        {__DEVELOPMENT__ && <DevTools />}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Router path="/" component={Main} >
            <Router exact path="/home" component={App} />
            <Router path="/list" component={List} >
              <Router exact path="/list/img" component={Img} />
              <Router exact path="/list/svg" component={Svg} />
              <Router exact path="/list/icon" component={Icon} />
              <Redirect to="/list/img" />
            </Router>
            <Router exact path="/web3" component={WebThree} />
            <Router exact path="/user" component={User} />
            <Route path="*" component={NotFound} />
            <Redirect to="home" />
          </Router>
        </Switch>
      </div>
    </Provider>
  </HashRouter>
);

export default hot(module)(Root);
