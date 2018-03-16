import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../components/Header';
import HomeContainer from './HomeContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={ HomeContainer } />
        </Switch>
      </div>
    );
  }
}

export default App;
