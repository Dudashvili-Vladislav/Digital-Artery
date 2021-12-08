import classes from "./Chat.module.scss";
import React from "react";
import { users } from "../../../../../assets/chat/users";
export const Chat = ({ lastMessage, user }) => {
  const userData = users.filter(({ id }) => id === user)[0];

  return (
    <div className={classes.chat}>
      <img src={userData.image} className={classes.chat__img} />
      <div className={classes.lastMessage}>
        <div className={classes.owner}>
          {lastMessage.owner === user ? userData.name : "Вы"}
        </div>{" "}
        {lastMessage.text.length > 20
          ? lastMessage.text.substr(0, 100) + "..."
          : lastMessage.text}
      </div>
    </div>
  );
};
