import React from 'react';
import classes from './BettingBox.module.css';


const BettingBox = (props) => {
  
    let max = props.bank;

    return (
      <form className={classes.BettingBox}>
        <span>Bank: ${props.bank}</span>
        <br/>
        <input onChange={props.betChange} type="number" min="50" max={max} value={props.betAmount} step="50" disabled={props.gameOver}/>
        <button onClick={props.allIn} disabled={props.gameOver}>All In</button>
      </form>
    )
}


export default BettingBox;