import React from 'react';
import ControlBtn from './ControlBtn/ControlBtn';
import classes from './ControlBar.module.css';

const ControlBar = (props) => (
  <div className={classes.ControlBar}>
    <ControlBtn clicked={props.hitHandler}>Hit Me</ControlBtn>
    <ControlBtn clicked={props.standHandler}>Stand</ControlBtn>
    <ControlBtn clicked={props.newGameHandler}>Play Again</ControlBtn>
  </div>
);

export default ControlBar;