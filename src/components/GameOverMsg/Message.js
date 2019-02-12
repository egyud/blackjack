import React from 'react';
import classes from './Message.module.css';

const Message = (props) => (
    <h1 className={classes.Message}>{props.children}</h1>
);

export default Message;
