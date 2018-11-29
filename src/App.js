import React, { Component } from 'react';
import Table from './components/Table';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faCaretUp,
  faCaretDown,
  faSync,
  faArrowLeft,
  faArrowAltCircleRight,
  faWindowClose
} from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCaretUp, faCaretDown, faSync, faArrowLeft, faArrowAltCircleRight, faWindowClose);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="title">Insight Engines Pivot Table Exercise</h1>
            <span>
              By <a href="mailto:tylerjamesgreve@gmail.com">Tyler J Greve</a>
            </span>
          </header>
          <div className="App-body">
            <Route path="/:id" component={Table} />
            <Route path="/" exact component={Table} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
