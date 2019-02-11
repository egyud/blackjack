import React from 'react';

const ControlBtn = (props) => (
  <button
    onClick={props.clicked}
  >{props.children}</button>
);

export default ControlBtn;