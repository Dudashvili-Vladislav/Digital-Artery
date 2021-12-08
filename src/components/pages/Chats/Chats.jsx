import { Dialog } from "./dialog/dialog";
import React, { useEffect, useState } from "react";
import { createChats } from "../../../../assets/chat/chats";
import { Chat } from "./Chat/Chat";
import classes from "./Chats.module.scss";
import { useDispatch } from "react-redux";
import { actions } from "../../../redux/actions";
export const Chats = () => {
  const chats = createChats();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions().setUser(1));
  }, []);

  const [currentUser, setCurrentUser] = useState(0);
  const chatsRendered = chats.map(({ messages, user }, i) => (
    <Chat lastMessage={messages[messages.length - 1]} user={user} key={i} />
  ));
  return (
    <div className={classes.chats}>
      <div className={classes.chatsTitles}> {chatsRendered}</div>
      <div className={classes.dialog}>
        <Dialog messages={chats[currentUser].messages} />
      </div>
    </div>
  );
};
