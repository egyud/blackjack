import React from 'react';
import ControlBtn from './ControlBtn/ControlBtn';

const ControlBar = (props) => (
  <div>
    <ControlBtn clicked={props.hitHandler}>Hit Me</ControlBtn>
    <ControlBtn clicked={props.standHandler}>Stand</ControlBtn>
    <ControlBtn clicked={props.newGameHandler}>Play Again</ControlBtn>
  </div>
);

export default ControlBar;