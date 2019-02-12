import React from 'react';
import classes from './ControlBtn.module.css';

const ControlBtn = (props) => (
  <button
    className={classes.ControlBtn}
    onClick={props.clicked}
  >{props.children}</button>
);

export default ControlBtn;