import classes from "./Chat.module.scss";
import React from "react";
import { users } from "../../../../../assets/chat/users";
export const Chat = ({ lastMessage, user }) => {
  const { image, name } = users.filter(({ id }) => id === user)[0]; // Находим пользователя, с которым диалог
  const isPC = matchMedia("(min-width: 1400px)").matches;
  return (
    <div className={classes.chat}>
      <img src={image} className={classes.chat__img} />
      <div className={classes.lastMessage}>
        <div className={classes.owner}>{name}</div>
        {lastMessage.text.length > 100 && isPC
          ? lastMessage.text.substr(0, 100) + "..."
          : lastMessage.text.substr(0, 30) + "..."}
      </div>
    </div>
  );
};
