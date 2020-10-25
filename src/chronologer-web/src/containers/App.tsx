import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';

class App implements React.Component<{}, {}> {



  render() {
    return <button className="btn btn-success" onClick={this.onClick}>Split</button>
  }

  onClick() {

  }
}

export default App;
