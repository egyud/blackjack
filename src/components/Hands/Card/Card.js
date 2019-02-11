import React from 'react';
import classes from './Card.module.css';

const Card = (props) => (
  <div className={classes.Card}>
    <div className={classes.Top}>{props.symbol}</div>
    <div className={classes.Mid}>{props.mid}</div>
    <div className={classes.Bottom}>{props.symbol}</div>
  </div>
);

export default Card;