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
import { EscapeType } from './constants';
import { LANGUAGES, LanguageType} from './languages';
import LanguageLink from './LanguageLink';

const history = createBrowserHistory();

const App = () => {
  const [languageType, setLanguageType] = useState(LanguageType.Python);
    const [escapeType, setEscapeType] = useState(EscapeType.Hex);

  const handleLanguageChange = (languageType: LanguageType) => {
    setLanguageType(languageType);
    // Reset escape type since not every language has every escape
    setEscapeType(EscapeType.Hex);
  }

  const getLanguages = () => {
    return Object.keys(LanguageType)
    .filter((key: string) => !isNaN(Number(LanguageType[key])))
    .sort((a, b) => a.localeCompare(b));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-row w-full bg-blue-400 h-10 flex flex-row justify-start items-center p-4">
        <h1 className="text-white">Ansi Escape Artist</h1>
      </div>
      <Router history={history}>
        <div className="flex flex-row flex-1">
          <div className="bg-gray-500 flex-shrink-0 flex flex-col w-72 p-4">
            <div className="p-4 flex flex-col items-center">
              <span className="block uppercase text-xs font-bold text-white mb-2">Language</span>
              {getLanguages().map(key => {
                return (<LanguageLink 
                  key={key}
                  languageName={LANGUAGES[LanguageType[key]].name}
                  language={LanguageType[key]}
                  selected={LanguageType[key] === languageType}
                  handleClick={handleLanguageChange}
                />);
              })}
            </div>
          </div>
        <div className="flex flex-1 flex-col">
          <nav className="px-4 flex flex-row w-full items-start justify-start bg-white p-4 shadow-sm">
            <NavLink to="/colour" exact 
              className="text-gray-600 mx-4 hover:text-blue-900" 
              activeClassName="border-b text-blue-900 border-blue-900">Colour
            </NavLink>
            <NavLink to="/movement" exact 
              className="text-gray-600 mx-4 hover:text-blue-900" 
              activeClassName="border-b text-blue-900 border-blue-900">Movement
            </NavLink>
          </nav>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/colour" />} />
            <Route default exact path="/colour"> 
              <EscapeColour languageType={languageType} escapeType={escapeType} setEscapeType={setEscapeType}/>
            </Route>
            <Route path="/movement">
              <EscapeMovement languageType={languageType} escapeType={escapeType} setEscapeType={setEscapeType}/>  
            </Route>
          </Switch>
        </div>
      </div>
      </Router>
      <footer></footer>
    </div>
  )
};

export default App;
