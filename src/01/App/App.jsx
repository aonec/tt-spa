import React, { useEffect } from 'react';
import styled from 'reshadow/macro';
import { Route, Switch, Redirect } from 'react-router-dom';
import '01/css/index.css';
import '01/css/styles.css';
import { app } from '01/styles/app';
import { Logotip, Menu } from '01/components';
import {
  Tasks,
  Login,
  TaskProfile,
  Objects,
  ObjectProfile,
  DeviceProfile,
  MetersPage,
  ApartmentProfile,
  ErrorPage,
  AccessDeniedPage,
  Devices,
} from '01/_pages';

import EditCalculator from '01/_pages/EditCalculator';

import { IndividualDevice } from '01/_pages/IndividualDevice';
import moment from 'moment';
import { Provider, connect } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
// библиотека обработки дат и локализация СНГ
import 'moment/locale/ru';
import rootReducer from '01/Redux/rootReducer';
import { useApp } from './useApp';
import thunkMiddleWare from "redux-thunk";
import { ConfigProvider } from "antd";
import ruRu from "antd/es/locale/ru_RU";
import DeviceSearchForm from "../_pages/Devices/components/DeviceSearchForm/DeviceSearchForm";
import EditODPU from '../_pages/EditODPU';

moment.locale('ru');

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log('Middleware', store.getState());
  return result;
};

export const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware, thunkMiddleWare),
);

window.store = store;

export function App(){
  const AppProvider = useApp();
  console.log('store', store);

  return styled(app)(
    <Provider store={store}>
      <AppProvider>
        <ConfigProvider locale={ruRu}>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/logout" render={() => 'logout'}/>
            {/* <Route path="/error/" render={() => "404"} /> */}
            <Route path="/error/" render={() => <ErrorPage/>}/>
            <Route path="/access-denied/" render={() => <AccessDeniedPage/>}/>
            <Route path="/form/" render={() => <DeviceSearchForm/>}/>
            <Route path="/">
              <layout>
                <menu as="div">
                  <Logotip/>
                  <Menu/>
                </menu>
                <main>
                  <Switch>
                    <Redirect from="/tasks" to="/tasks/executing" exact/>
                    <Route
                      path="/tasks/(executing|observing|archived)/"
                      component={Tasks}
                    />
                    <Route path="/tasks/(\\d+)" component={TaskProfile}/>
                    <Route path="/objects/" component={Objects} exact/>
                    <Route path="/devices/" component={Devices} exact/>

                    <Route
                      path="/objects/(\\d+)/devices/(\\d+)/(connection|related|documents)?"
                      component={DeviceProfile}
                      exact
                    />

                    <Route
                      path="/objects/(\\d+)/devices/(\\d+)/edit/"
                      component={EditCalculator}
                      exact
                    />
                    <Route
                      path="/objects/(\\d+)/devices/(\\d+)/edit_odpu/"
                      component={EditODPU}
                      exact
                    />

                    <Route
                      path="/objects/(\\d+)/(apartments|devices)?"
                      component={ObjectProfile}
                      exact
                    />

                    <Route
                      path="/objects/(\\d+)/apartments/(\\d+)/(testimony|documents|changes)?"
                      component={ApartmentProfile}
                      exact
                    />
                    <Route
                      path="/objects/(\\d+)/apartments/(\\d+)/devices/(\\d+)/(connection|documents)?"
                      component={IndividualDevice}
                      exact
                    />

                    <Redirect from="/meters/" to="/meters/apartments" exact/>
                    <Route
                      path="/meters/(apartments|houses)"
                      component={MetersPage}
                    />
                    <Redirect to="/tasks/"/>
                  </Switch>
                </main>
              </layout>
            </Route>
          </Switch>
          {/* <Pages /> */}
        </ConfigProvider>
      </AppProvider>
    </Provider>,
  );
}

export default App;
