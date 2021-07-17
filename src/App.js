import React from 'react';
import {
  Route, Switch, BrowserRouter as Router,
} from 'react-router-dom';
import AppContextProvider from './Context/Context';
import './App.css';
import SearchPage from './SearchPage/SearchPage';
import GraphPage from './GraphPage/GraphPage';
import ErrorPage from './ErrorPage/ErrorPage';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={SearchPage} />
            <Route exact path="/results" component={GraphPage} />
            <Route exact path="/error" component={ErrorPage} />
          </Switch>
        </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
