import { Message } from "./message/message";
import React from "react";

import classes from "./dialog.module.scss";
import { chats } from "../Chats";
import { users } from "../../../../../assets/chat/users";
export const Dialog = (props) => {
  if (props.messages) {
    const renderedMessages = props.messages.map(({ owner, text, time }, i) => (
      <Message
        owner={owner}
        time={time}
        text={text}
        key={i}
        ourMessage={props.id === owner}
      />
    ));
    return (
      <div className={classes.dialog}>
        {props.messages.owner}
        {renderedMessages}
      </div>
    );
  }
  const renderedChats = chats[props.match.params.id].messages.map(
    ({ owner, text, time }, i) => (
      <Message
        owner={owner}
        time={time}
        text={text}
        key={i}
        ourMessage={chats[props.match.params.id].user === owner}
      />
    )
  );
  const user = users[chats[props.match.params.id].user]
  return <div className={classes.dialog}><div className={classes.dialog__title}> <img src={user.image} alt="" className={classes.dialog__title_img} />{user.name}</div> {renderedChats}</div>;
};
