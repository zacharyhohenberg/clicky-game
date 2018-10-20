import React, { Component} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import CardContainer from "./components/CardContainer"

class App extends Component {
  // setting the state
  state = {
    count: 0,
    topScore: 0
  }

  // update the current score count in the nav
  updateCurrentScore = (newCount) => {
    // set the new count as the count
    this.setState({count: newCount});
  }

  // update the top score in the nav
  updateTopScore = (newTop) => {
    // if the new top score is higher than the current
    if (newTop > this.state.topScore) {
      // then set the state but you have to subtract 1
      this.setState({topScore: newTop - 1})
    }
  }

  render() {
    return (
      <div>
        <Navbar score={this.state.count} top={this.state.topScore}/>
        <Header/>
        <CardContainer updateCurrentScore={this.updateCurrentScore} updateTopScore={this.updateTopScore}/>
      </div>
    );
  }
}

export default App;