import { Message } from "./message/message";
import React from "react";
import { useSelector } from "react-redux";
import classes from "./dialog.module.scss";
export const Dialog = ({ messages }) => {
  const userId = useSelector((state) => state.user.id);

  const renderedMessages = messages.map(({ owner, text, time }, i) => (
    <Message
      owner={owner}
      time={time}
      text={text}
      key={i}
      ourMessage={userId === owner}
    />
  ));
  return <div className={classes.dialog}>{messages.owner}{renderedMessages}</div>;
};
