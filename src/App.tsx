import React, { useState } from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom';

import './App.css'

import EscapeColour from './EscapeColour';
import EscapeMovement from './EscapeMovement';
import { EscapeType } from './constants';
import { LANGUAGES, LanguageType } from './languages';
import LanguageLink from './LanguageLink';

const App = () => {
  const [languageType, setLanguageType] = useState(LanguageType.Bash);
  const [escapeType, setEscapeType] = useState(EscapeType.Hex);

  const handleLanguageChange = (languageType: LanguageType) => {
    setLanguageType(languageType);
    // Reset escape type since not every language has every escape
    setEscapeType(EscapeType.Hex);
  }

  const getLanguages = (): Array<string> => {
    return Object.keys(LanguageType)
      .filter((key: string) => !isNaN(Number((LanguageType as any)[key])))
      .sort((a, b) => a.localeCompare(b));
  }

  const getLanguageLinks = () => {
    return getLanguages().map(key => {
      const language: LanguageType = (LanguageType as any)[key];
      return (<LanguageLink
        key={key}
        languageName={LANGUAGES[language].name}
        language={language}
        selected={language === languageType}
        handleClick={handleLanguageChange}
      />);
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <div className="flex flex-row flex-1">
          <div className="bg-gray-900 flex-shrink-0 flex flex-col w-72 shadow-sm">
            <div className="bg-gray-700 flex p-4 text-center h-32 justify-center items-center flex-col">
              <h1 className="text-white h-6 block my-2">Ansi Escape Artist</h1>
              <a href="https://github.com/misterkeefe/ansi-escape-artist"><img className="my-2" src="https://shields.io/github/stars/misterkeefe/ansi-escape-artist?style=social"/></a>
            </div>
            <div className="p-4 flex flex-col items-center">
              <span className="block uppercase text-xs font-bold text-white mb-2">Language</span>
              {getLanguageLinks()}
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <nav className="px-4 flex flex-row w-full items-start justify-start bg-white p-4 shadow-sm h-14">
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
              <Route exact path="/colour">
                <EscapeColour languageType={languageType} escapeType={escapeType} setEscapeType={setEscapeType} />
              </Route>
              <Route path="/movement">
                <EscapeMovement languageType={languageType} escapeType={escapeType} setEscapeType={setEscapeType} />
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
