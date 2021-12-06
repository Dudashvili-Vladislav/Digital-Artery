import React from "react";
import { createChats } from "../../../../assets/chat/chats";
import { Chat } from "./Chat/Chat";
import classes from "./Chats.module.scss";
export const Chats = () => {
  const chats = createChats();

  const chatsRendered = chats.map(({messages, user}, i) => <Chat lastMessage = {messages[messages.length-1]} user = {user} key = {i}/> )
  return <div className={classes.chats}>{chatsRendered}</div>;
};
