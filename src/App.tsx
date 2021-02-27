import React, { useState } from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom';
import { createBrowserHistory } from "history";

import './App.css'

import EscapeColour from './EscapeColour';
import EscapeMovement from './EscapeMovement';

const history = createBrowserHistory();

const App = () => {
  return (
    <div>
      <Router history={history}>
          <div className="flex flex-row w-full">
            <div className="flex flex-row text-gray-700 bg-gray-900 flex-shrink-0 w-full">
              <nav className="flex-grow px-4 py-4 flex flex-row">
                <NavLink to="/colour" exact className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex-row flex" activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium flex-row flex">Colour</NavLink>
                <NavLink to="/movement" exact className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex-row flex" activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium flex-row flex">Movement</NavLink>
              </nav>
            </div>
          </div>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/colour" />} />
          <Route default exact path="/colour" component={EscapeColour} />
          <Route path="/movement" component={EscapeMovement} />
        </Switch>
      </Router>
      <footer></footer>
    </div>
  )
};

export default App;
