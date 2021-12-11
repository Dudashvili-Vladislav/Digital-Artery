import { Message } from "./message/message";
import React from "react";

import classes from "./dialog.module.scss";
export const Dialog = ({ messages, id }) => {
  

  const renderedMessages = messages.map(({ owner, text, time }, i) => (
    <Message
      owner={owner}
      time={time}
      text={text}
      key={i}
      ourMessage={id === owner}
    />
  ));
  return <div className={classes.dialog}>{messages.owner}{renderedMessages}</div>;
};
