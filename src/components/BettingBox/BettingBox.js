import React, { Component } from 'react';


class BettingBox extends Component {
  state = {
    bank: 900
  }

  render() {
    let max = this.state.bank;
    return (
      <div>
        <span>Bank: ${this.state.bank}</span>
        <br/>
        <input type="number" min="1" max={max} value="100" step="50"/>
        <button>All In</button>
      </div>
    )
  }
}

export default BettingBox;