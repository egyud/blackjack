import React, { Component } from 'react';
import BettingBox from './components/BettingBox/BettingBox';
import ControlBar from './components/ControlBar/ControlBar';
import {shuffle, cardDeck} from './Cards';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BettingBox />
        <ControlBar />
      </div>
    );
  }
}

export default App;
