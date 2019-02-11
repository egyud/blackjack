import React, { Component } from 'react';


class BettingBox extends Component {
  state = {
    bank: 900,
    betAmount: 100
  }

  inputChangeHandler = (event) => {
    event.persist();
    event.preventDefault();
    this.setState({
      betAmount: event.target.value
    })
  }

  allInHandler = () => {
    this.setState(prevState => ({
      betAmount: prevState.bank
    }))
  }

  render() {
    let max = this.state.bank;
    return (
      <div>
        <span>Bank: ${this.state.bank}</span>
        <br/>
        <input onChange={this.inputChangeHandler} type="number" min="50" max={max} value={this.state.betAmount} step="50"/>
        <button onClick={this.allInHandler}>All In</button>
      </div>
    )
  }
}

export default BettingBox;